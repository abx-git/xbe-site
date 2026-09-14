import './styles.css';
import { deriveKeyFromPassword, importRawKey } from './crypto.js';
import {
  applyRichAction,
  applySourceAction,
  htmlToMarkdown,
  isEditableFile,
  isMarkdownFile,
  markdownToHtml,
  MARKDOWN_TOOLBAR,
  renderMarkdown,
} from './editor.js';
import {
  buildTree,
  importFromDataTransfer,
  isFileSystemAccessSupported,
  listDirectory,
  loadChildren,
  moveEntry,
  pickDirectory,
  readDecryptedFile,
  removeEntry,
  renameEntry,
  updateEncryptedFileContent,
} from './fs-adapter.js';
import type { AppPhase, MarkdownEditMode, PreviewState, VaultEntry, VaultNode } from './types';

// ── Application State (flüchtiger RAM, kein Persist) ──

let cryptoKey: CryptoKey | null = null;
let rootHandle: FileSystemDirectoryHandle | null = null;
let rootTree: VaultNode | null = null;
let currentDirHandle: FileSystemDirectoryHandle | null = null;
let currentPath = '/';
let currentEntries: VaultEntry[] = [];
let preview: PreviewState | null = null;
let phase: AppPhase = 'unlock';
let statusMessage = '';
let statusBusy = false;
let unlockTab: 'password' | 'file' = 'password';
let unlockError = '';
let contextMenu: { x: number; y: number; entry: VaultEntry; parentPath: string } | null = null;
let dragEntry: { entry: VaultEntry; sourcePath: string } | null = null;

const VAULT_DRAG_TYPE = 'application/x-vault-entry';
const app = document.getElementById('app')!;

// ── Rendering ──

function setStatus(msg: string, busy = false): void {
  statusMessage = msg;
  statusBusy = busy;
  renderStatusBar();
}

function renderStatusBar(): void {
  const bar = document.querySelector('.status-bar');
  if (!bar) return;
  bar.innerHTML = statusBusy
    ? `<span class="spinner"></span><span>${escapeHtml(statusMessage)}</span>`
    : `<span class="${statusMessage.startsWith('✓') ? 'status-success' : ''}">${escapeHtml(statusMessage)}</span>`;
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function fileIcon(name: string, kind: string): string {
  if (kind === 'directory') return '📁';
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  const icons: Record<string, string> = {
    png: '🖼️', jpg: '🖼️', jpeg: '🖼️', gif: '🖼️', svg: '🖼️', webp: '🖼️',
    pdf: '📄', md: '📝', txt: '📝', json: '📋', js: '💻', ts: '💻',
    mp4: '🎬', webm: '🎬', mp3: '🎵', wav: '🎵',
    zip: '📦', gz: '📦',
  };
  return icons[ext] ?? '📄';
}

function render(): void {
  if (phase === 'unlock') {
    renderUnlock();
  } else if (phase === 'pick-directory') {
    renderPickDirectory();
  } else {
    renderExplorer();
  }
}

function renderUnlock(): void {
  const fsSupported = isFileSystemAccessSupported();
  app.innerHTML = `
    <div class="unlock-screen">
      <div class="unlock-card">
        <h1>🔐 Encrypted Vault</h1>
        <p class="subtitle">Verschlüsselter Dateimanager – rein clientseitig, ohne Backend.</p>
        ${!fsSupported ? `
          <div class="browser-warning">
            ⚠️ Die File System Access API wird von diesem Browser nicht unterstützt.
            Bitte verwenden Sie einen Chromium-basierten Browser (Chrome, Edge, Brave).
          </div>
        ` : ''}
        <div class="unlock-tabs">
          <button class="unlock-tab ${unlockTab === 'password' ? 'active' : ''}" data-tab="password">Passwort</button>
          <button class="unlock-tab ${unlockTab === 'file' ? 'active' : ''}" data-tab="file">Schlüsseldatei</button>
        </div>
        ${unlockTab === 'password' ? `
          <div class="form-group">
            <label for="password">Passwort</label>
            <input type="password" id="password" placeholder="Passwort eingeben…" autocomplete="off" />
          </div>
        ` : `
          <div class="form-group">
            <label for="keyfile">Schlüsseldatei (.key / .bin, 32 Bytes)</label>
            <input type="file" id="keyfile" accept=".key,.bin" />
          </div>
        `}
        <button class="btn btn-primary" id="unlock-btn" ${!fsSupported ? 'disabled' : ''}>
          Entsperren
        </button>
        ${unlockError ? `<p class="error-msg">${escapeHtml(unlockError)}</p>` : ''}
      </div>
    </div>
  `;

  app.querySelectorAll('.unlock-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      unlockTab = (tab as HTMLElement).dataset.tab as 'password' | 'file';
      unlockError = '';
      render();
    });
  });

  app.querySelector('#unlock-btn')?.addEventListener('click', handleUnlock);
}

function renderPickDirectory(): void {
  app.innerHTML = `
    <div class="unlock-screen">
      <div class="unlock-card">
        <h1>📂 Verzeichnis wählen</h1>
        <p class="subtitle">Schlüssel geladen. Wählen Sie das verschlüsselte Vault-Verzeichnis auf Ihrem lokalen Dateisystem.</p>
        <button class="btn btn-primary" id="pick-dir-btn">Verzeichnis auswählen</button>
        <button class="btn btn-secondary" id="lock-btn" style="margin-top:0.75rem;width:100%">Sperren</button>
        ${unlockError ? `<p class="error-msg">${escapeHtml(unlockError)}</p>` : ''}
      </div>
    </div>
  `;

  app.querySelector('#pick-dir-btn')?.addEventListener('click', handlePickDirectory);
  app.querySelector('#lock-btn')?.addEventListener('click', handleLock);
}

function renderExplorer(): void {
  app.innerHTML = `
    <div class="explorer">
      <div class="toolbar">
        <h1>🔐 Encrypted Vault</h1>
        <button class="btn btn-secondary" id="refresh-btn">Aktualisieren</button>
        <button class="btn btn-danger" id="lock-btn">Sperren</button>
      </div>
      <div class="explorer-body">
        <div class="sidebar" id="sidebar"></div>
        <div class="main-panel" id="main-panel">
          <div class="breadcrumb" id="breadcrumb"></div>
          <div class="canvas" id="canvas">
            <div class="file-grid" id="file-grid"></div>
            <div class="drop-overlay" id="drop-overlay">
              <span class="drop-overlay-icon">📥</span>
              <span>Dateien oder Ordner hierher ziehen zum Importieren</span>
            </div>
          </div>
        </div>
      </div>
      <div class="status-bar">
        ${statusBusy
          ? `<span class="spinner"></span><span>${escapeHtml(statusMessage)}</span>`
          : `<span>${escapeHtml(statusMessage || 'Bereit')}</span>`}
      </div>
    </div>
  `;

  renderTree();
  renderBreadcrumb();
  renderFileGrid();
  setupCanvasDrop();
  setupGlobalDismiss();

  app.querySelector('#refresh-btn')?.addEventListener('click', handleRefresh);
  app.querySelector('#lock-btn')?.addEventListener('click', handleLock);
}

function renderTree(): void {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar || !rootTree) return;
  sidebar.innerHTML = renderTreeNode(rootTree, 0);

  sidebar.querySelectorAll('.tree-item').forEach((item) => {
    const el = item as HTMLElement;
    const path = el.dataset.path;
    if (!path) return;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      closeContextMenu();

      const node = findNode(rootTree!, path);
      if (!node) return;

      if (node.kind === 'directory') {
        navigateToDirectory(node);
        if (!node.loaded) {
          loadTreeNode(node);
        } else {
          node.expanded = !node.expanded;
          renderTree();
        }
      }
    });

    setupDropTarget(el, path);

    if (path !== '/') {
      el.addEventListener('contextmenu', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const node = findNode(rootTree!, path);
        if (!node || !cryptoKey) return;

        const parentPath = getParentPath(path);
        const parentHandle = getDirHandleForPath(parentPath);
        if (!parentHandle) return;

        try {
          const entries = await listDirectory(cryptoKey, parentHandle);
          const entry = entries.find((en) => en.decryptedName === node.name);
          if (entry) showContextMenu(e.clientX, e.clientY, entry, parentPath);
        } catch {
          // Kontextmenü optional
        }
      });
    }
  });
}

function renderTreeNode(node: VaultNode, depth: number): string {
  const isActive = node.path === currentPath;
  const indent = depth > 0 ? `style="padding-left:${depth * 0.75 + 0.75}rem"` : '';
  let html = '';

  if (depth === 0) {
    html += `<div class="tree-item ${isActive ? 'active' : ''}" data-path="${node.path}" ${indent}>
      <span class="icon">📂</span>
      <span>${escapeHtml(node.name)}</span>
    </div>`;
  } else if (node.kind === 'directory') {
    const chevron = node.children && node.children.length > 0
      ? `<span class="chevron ${node.expanded ? 'expanded' : ''}">▶</span>`
      : '<span class="chevron"></span>';
    html += `<div class="tree-item ${isActive ? 'active' : ''}" data-path="${node.path}" ${indent}>
      ${chevron}
      <span class="icon">📁</span>
      <span>${escapeHtml(node.name)}</span>
    </div>`;
  }

  if (node.expanded && node.children) {
    html += `<div class="tree-children">`;
    for (const child of node.children) {
      if (child.kind === 'directory') {
        html += renderTreeNode(child, depth + 1);
      }
    }
    html += `</div>`;
  }

  return html;
}

function renderBreadcrumb(): void {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;

  const parts = currentPath === '/' ? [] : currentPath.split('/');
  let html = `<span data-path="/">Root</span>`;
  let built = '';
  for (const part of parts) {
    built += (built ? '/' : '') + part;
    html += ` / <span data-path="${built}">${escapeHtml(part)}</span>`;
  }
  bc.innerHTML = html;

  bc.querySelectorAll('span').forEach((span) => {
    const el = span as HTMLElement;
    const path = el.dataset.path!;
    el.addEventListener('click', () => {
      closeContextMenu();
      const node = findNode(rootTree!, path);
      if (node && node.kind === 'directory') {
        navigateToDirectory(node);
      }
    });
    setupDropTarget(el, path);
  });
}

function renderFileGrid(): void {
  const grid = document.getElementById('file-grid');
  if (!grid) return;

  if (currentEntries.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span>📭</span><span>Dieser Ordner ist leer – Dateien hierher ziehen</span></div>`;
    return;
  }

  grid.innerHTML = currentEntries
    .map(
      (entry) => `
      <div class="file-card"
        data-name="${escapeHtml(entry.decryptedName)}"
        data-encrypted-name="${escapeHtml(entry.encryptedName)}"
        data-kind="${entry.kind}"
        draggable="true"
        title="${entry.kind === 'directory' ? 'Ordner öffnen · Ziehen zum Verschieben' : 'Ziehen zum Verschieben'}">
        <span class="file-icon">${fileIcon(entry.decryptedName, entry.kind)}</span>
        <span class="file-name">${escapeHtml(entry.decryptedName)}</span>
      </div>
    `,
    )
    .join('');

  grid.querySelectorAll('.file-card').forEach((card) => {
    const el = card as HTMLElement;
    const entry = findEntryByCard(el);
    if (!entry) return;

    el.addEventListener('click', () => {
      closeContextMenu();
      if (entry.kind === 'directory') {
        const name = entry.decryptedName;
        const node = findNode(rootTree!, currentPath === '/' ? name : `${currentPath}/${name}`);
        if (node) {
          navigateToDirectory(node);
          if (!node.loaded) loadTreeNode(node);
        } else {
          openSubDirectory(entry);
        }
      } else {
        openFilePreview(entry);
      }
    });

    el.addEventListener('dblclick', () => {
      if (entry.kind === 'file') openFilePreview(entry);
    });

    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, entry, currentPath);
    });

    el.addEventListener('dragstart', (e) => {
      dragEntry = { entry, sourcePath: currentPath };
      el.classList.add('dragging');
      e.dataTransfer?.setData(VAULT_DRAG_TYPE, entry.encryptedName);
      e.dataTransfer!.effectAllowed = 'move';
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      dragEntry = null;
      clearDropHighlights();
    });

    if (entry.kind === 'directory') {
      const targetPath = currentPath === '/' ? entry.decryptedName : `${currentPath}/${entry.decryptedName}`;
      setupDropTarget(el, targetPath);
    }
  });
}

function renderPreview(): void {
  const existing = document.querySelector('.preview-overlay');
  existing?.remove();

  if (!preview) return;

  const overlay = document.createElement('div');
  overlay.className = 'preview-overlay';
  const isMd = isMarkdownFile(preview.mimeType, preview.name);
  const editing = preview.editMode && preview.editable;

  let bodyContent = '';
  const mime = preview.mimeType;

  if (editing && isMd) {
    const mode = preview.markdownMode ?? 'rich';
    const toolbar = MARKDOWN_TOOLBAR.map(
      (btn) => `<button type="button" class="editor-btn" data-action="${btn.action}" title="${btn.title}">${btn.label}</button>`,
    ).join('');
    bodyContent = `
      <div class="editor-panel markdown-editor">
        <div class="editor-mode-tabs">
          <button type="button" class="editor-mode-tab ${mode === 'rich' ? 'active' : ''}" data-mode="rich">Formatiert</button>
          <button type="button" class="editor-mode-tab ${mode === 'source' ? 'active' : ''}" data-mode="source">Quelltext</button>
        </div>
        <div class="editor-toolbar" id="md-toolbar">${toolbar}</div>
        <div class="editor-rich ${mode === 'rich' ? '' : 'hidden'}" id="rich-editor" contenteditable="true">${markdownToHtml(preview.textContent ?? '')}</div>
        <textarea class="editor-textarea ${mode === 'source' ? '' : 'hidden'}" id="source-editor" spellcheck="false">${escapeHtml(preview.textContent ?? '')}</textarea>
      </div>`;
  } else if (editing) {
    bodyContent = `
      <div class="editor-panel">
        <textarea class="editor-textarea" id="text-editor" spellcheck="false">${escapeHtml(preview.textContent ?? '')}</textarea>
      </div>`;
  } else if (mime.startsWith('image/')) {
    bodyContent = `<img src="${preview.objectUrl}" alt="${escapeHtml(preview.name)}" />`;
  } else if (mime.startsWith('video/')) {
    bodyContent = `<video src="${preview.objectUrl}" controls></video>`;
  } else if (mime.startsWith('audio/')) {
    bodyContent = `<audio src="${preview.objectUrl}" controls></audio>`;
  } else if (mime === 'application/pdf') {
    bodyContent = `<iframe src="${preview.objectUrl}"></iframe>`;
  } else if (isMd && preview.textContent) {
    bodyContent = `<div class="markdown-body">${renderMarkdown(preview.textContent)}</div>`;
  } else if (mime.startsWith('text/') || mime === 'application/json') {
    bodyContent = `<pre class="preview-readonly">${escapeHtml(preview.textContent ?? '')}</pre>`;
  } else {
    bodyContent = `<div class="empty-state"><span>Dateityp kann nicht angezeigt werden</span><span>${escapeHtml(preview.name)}</span></div>`;
  }

  const dirtyBadge = preview.dirty ? '<span class="dirty-badge">Ungespeichert</span>' : '';
  const editBtn = preview.editable
    ? `<button class="btn btn-secondary" id="toggle-edit">${editing ? 'Vorschau' : 'Bearbeiten'}</button>`
    : '';
  const saveBtn = preview.editable && editing
    ? `<button class="btn btn-primary" id="save-preview" ${preview.dirty ? '' : 'disabled'}>Speichern</button>`
    : '';

  overlay.innerHTML = `
    <div class="preview-modal ${editing ? 'preview-modal--editing' : ''}">
      <div class="preview-header">
        <h2>${escapeHtml(preview.name)}${dirtyBadge}</h2>
        <div class="preview-actions">
          ${saveBtn}
          ${editBtn}
          <button class="btn btn-secondary" id="close-preview">Schließen</button>
        </div>
      </div>
      <div class="preview-body ${editing ? 'preview-body--editing' : ''}">${bodyContent}</div>
    </div>
  `;

  document.body.appendChild(overlay);

  setupPreviewEvents(overlay, isMd);
}

function setupPreviewEvents(overlay: HTMLElement, isMd: boolean): void {
  overlay.querySelector('#close-preview')?.addEventListener('click', () => {
    if (preview?.dirty) {
      if (!window.confirm('Ungespeicherte Änderungen verwerfen?')) return;
    }
    closePreview();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (preview?.dirty && !window.confirm('Ungespeicherte Änderungen verwerfen?')) return;
      closePreview();
    }
  });

  overlay.querySelector('#toggle-edit')?.addEventListener('click', toggleEditMode);
  overlay.querySelector('#save-preview')?.addEventListener('click', savePreview);

  if (!preview?.editMode) return;

  const markDirty = () => {
    if (!preview) return;
    preview.dirty = true;
    const saveBtn = overlay.querySelector('#save-preview') as HTMLButtonElement | null;
    if (saveBtn) saveBtn.disabled = false;
    const badge = overlay.querySelector('.dirty-badge');
    if (!badge) {
      overlay.querySelector('.preview-header h2')?.insertAdjacentHTML('beforeend', '<span class="dirty-badge">Ungespeichert</span>');
    }
  };

  if (isMd) {
    const richEditor = overlay.querySelector('#rich-editor') as HTMLElement | null;
    const sourceEditor = overlay.querySelector('#source-editor') as HTMLTextAreaElement | null;

    overlay.querySelectorAll('.editor-mode-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        if (!preview || !richEditor || !sourceEditor) return;
        const newMode = (tab as HTMLElement).dataset.mode as MarkdownEditMode;
        const oldMode = preview.markdownMode ?? 'rich';
        if (newMode === 'source' && oldMode === 'rich') {
          sourceEditor.value = htmlToMarkdown(richEditor);
        } else if (newMode === 'rich' && oldMode === 'source') {
          richEditor.innerHTML = markdownToHtml(sourceEditor.value);
        }
        preview.markdownMode = newMode;
        richEditor.classList.toggle('hidden', newMode !== 'rich');
        sourceEditor.classList.toggle('hidden', newMode !== 'source');
        overlay.querySelectorAll('.editor-mode-tab').forEach((t) => {
          t.classList.toggle('active', (t as HTMLElement).dataset.mode === newMode);
        });
      });
    });

    overlay.querySelectorAll('.editor-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLElement).dataset.action!;
        const mode = preview?.markdownMode ?? 'rich';
        if (mode === 'rich' && richEditor) {
          applyRichAction(action as Parameters<typeof applyRichAction>[0], richEditor);
        } else if (sourceEditor) {
          applySourceAction(action as Parameters<typeof applySourceAction>[0], sourceEditor);
        }
        markDirty();
      });
    });

    richEditor?.addEventListener('input', markDirty);
    sourceEditor?.addEventListener('input', markDirty);
  } else {
    overlay.querySelector('#text-editor')?.addEventListener('input', markDirty);
  }
}

function toggleEditMode(): void {
  if (!preview?.editable) return;
  if (preview.editMode && preview.dirty) {
    if (!window.confirm('Ungespeicherte Änderungen verwerfen?')) return;
    preview.dirty = false;
  }
  preview.editMode = !preview.editMode;
  if (preview.editMode && isMarkdownFile(preview.mimeType, preview.name)) {
    preview.markdownMode = preview.markdownMode ?? 'rich';
  }
  renderPreview();
}

async function savePreview(): Promise<void> {
  if (!cryptoKey || !preview?.fileHandle || !preview.editable) return;

  const overlay = document.querySelector('.preview-overlay');
  let text = '';

  if (isMarkdownFile(preview.mimeType, preview.name)) {
    const mode = preview.markdownMode ?? 'rich';
    if (mode === 'source') {
      const source = overlay?.querySelector('#source-editor') as HTMLTextAreaElement | null;
      text = source?.value ?? preview.textContent ?? '';
    } else {
      const rich = overlay?.querySelector('#rich-editor') as HTMLElement | null;
      text = rich ? htmlToMarkdown(rich) : preview.textContent ?? '';
    }
  } else {
    const textarea = overlay?.querySelector('#text-editor') as HTMLTextAreaElement | null;
    text = textarea?.value ?? preview.textContent ?? '';
  }

  try {
    setStatus('Speichere verschlüsselt…', true);
    const encoded = new TextEncoder().encode(text);
    const buffer = encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength) as ArrayBuffer;
    await updateEncryptedFileContent(cryptoKey, preview.fileHandle, buffer, (msg) => setStatus(msg, true));

    URL.revokeObjectURL(preview.objectUrl);
    const blob = new Blob([buffer], { type: preview.mimeType });
    preview.objectUrl = URL.createObjectURL(blob);
    preview.textContent = text;
    preview.dirty = false;
    preview.editMode = false;
    setStatus(`✓ ${preview.name} gespeichert (verschlüsselt)`);
    renderPreview();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Speichern fehlgeschlagen');
  }
}

// ── Event Handlers ──

async function handleUnlock(): Promise<void> {
  unlockError = '';
  setStatus('Schlüssel wird geladen…', true);

  try {
    if (unlockTab === 'password') {
      const input = document.getElementById('password') as HTMLInputElement;
      const password = input?.value;
      if (!password) {
        unlockError = 'Bitte Passwort eingeben.';
        setStatus('');
        render();
        return;
      }
      cryptoKey = await deriveKeyFromPassword(password);
    } else {
      const input = document.getElementById('keyfile') as HTMLInputElement;
      const file = input?.files?.[0];
      if (!file) {
        unlockError = 'Bitte Schlüsseldatei auswählen.';
        setStatus('');
        render();
        return;
      }
      cryptoKey = await importRawKey(await file.arrayBuffer());
    }

    phase = 'pick-directory';
    setStatus('Schlüssel geladen');
    render();
  } catch (err) {
    unlockError = err instanceof Error ? err.message : 'Entsperren fehlgeschlagen.';
    setStatus('');
    render();
  }
}

async function handlePickDirectory(): Promise<void> {
  unlockError = '';
  if (!cryptoKey) return;

  try {
    setStatus('Verzeichnis wird geöffnet…', true);
    rootHandle = await pickDirectory();
    currentDirHandle = rootHandle;
    currentPath = '/';

    rootTree = await buildTree(cryptoKey, rootHandle);
    currentEntries = await listDirectory(cryptoKey, rootHandle, (msg) => setStatus(msg, true));

    phase = 'explorer';
    setStatus(`✓ ${currentEntries.length} Einträge geladen`);
    render();
  } catch (err) {
    if ((err as DOMException).name === 'AbortError') {
      setStatus('');
      return;
    }
    unlockError = err instanceof Error ? err.message : 'Verzeichnis konnte nicht geöffnet werden.';
    setStatus('');
    render();
  }
}

async function handleRefresh(): Promise<void> {
  if (!cryptoKey || !currentDirHandle) return;

  try {
    setStatus('Aktualisiere…', true);
    rootTree = await buildTree(cryptoKey, rootHandle!);
    currentEntries = await listDirectory(cryptoKey, currentDirHandle, (msg) => setStatus(msg, true));
    setStatus(`✓ ${currentEntries.length} Einträge`);
    renderExplorer();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Aktualisierung fehlgeschlagen');
  }
}

function handleLock(): void {
  closePreview();
  cryptoKey = null;
  rootHandle = null;
  rootTree = null;
  currentDirHandle = null;
  currentPath = '/';
  currentEntries = [];
  phase = 'unlock';
  unlockError = '';
  statusMessage = '';
  statusBusy = false;
  render();
}

async function navigateToDirectory(node: VaultNode): Promise<void> {
  if (!cryptoKey || !node.handle) return;
  currentDirHandle = node.handle as FileSystemDirectoryHandle;
  currentPath = node.path;
  node.expanded = true;

  try {
    setStatus('Lade Ordner…', true);
    currentEntries = await listDirectory(cryptoKey, currentDirHandle, (msg) => setStatus(msg, true));
    setStatus(`✓ ${currentEntries.length} Einträge`);
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Fehler beim Laden');
  }

  renderExplorer();
}

async function openSubDirectory(entry: VaultEntry): Promise<void> {
  if (!cryptoKey || entry.kind !== 'directory') return;

  const dirHandle = entry.handle as FileSystemDirectoryHandle;
  const newPath = currentPath === '/' ? entry.decryptedName : `${currentPath}/${entry.decryptedName}`;

  const newNode: VaultNode = {
    name: entry.decryptedName,
    path: newPath,
    kind: 'directory',
    handle: dirHandle,
    children: [],
    expanded: true,
    loaded: false,
  };

  if (rootTree) {
    attachNode(rootTree, currentPath, newNode);
  }

  await navigateToDirectory(newNode);
  await loadTreeNode(newNode);
}

async function loadTreeNode(node: VaultNode): Promise<void> {
  if (!cryptoKey || node.kind !== 'directory' || !node.handle) return;

  try {
    const children = await loadChildren(cryptoKey, node);
    node.children = children;
    node.loaded = true;
    node.expanded = true;
    renderTree();
  } catch {
    // Tree-Laden ist nicht kritisch
  }
}

async function openFilePreview(entry: VaultEntry): Promise<void> {
  if (!cryptoKey || entry.kind !== 'file') return;

  closePreview();

  try {
    setStatus(`Entschlüssele: ${entry.decryptedName}…`, true);
    const fileHandle = entry.handle as FileSystemFileHandle;
    const { name, content, mimeType } = await readDecryptedFile(cryptoKey, fileHandle);

    const buffer = content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength) as ArrayBuffer;
    const blob = new Blob([buffer], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);

    let textContent: string | undefined;
    if (mimeType.startsWith('text/') || mimeType === 'application/json') {
      textContent = new TextDecoder().decode(content);
    }

    const editable = isEditableFile(mimeType, name);
    preview = {
      name,
      objectUrl,
      mimeType,
      textContent,
      fileHandle,
      editable,
      editMode: false,
      markdownMode: isMarkdownFile(mimeType, name) ? 'rich' : undefined,
      dirty: false,
    };
    setStatus(`✓ ${name} geöffnet`);
    renderPreview();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Datei konnte nicht geöffnet werden');
  }
}

function closePreview(): void {
  if (preview) {
    URL.revokeObjectURL(preview.objectUrl);
    preview = null;
  }
  document.querySelector('.preview-overlay')?.remove();
}

function setupCanvasDrop(): void {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementById('drop-overlay');
  if (!canvas || !overlay) return;

  let dragDepth = 0;

  canvas.addEventListener('dragenter', (e) => {
    if (!isExternalFileDrag(e)) return;
    e.preventDefault();
    dragDepth++;
    overlay.classList.add('visible');
  });

  canvas.addEventListener('dragleave', (e) => {
    if (!isExternalFileDrag(e)) return;
    dragDepth--;
    if (dragDepth <= 0) {
      dragDepth = 0;
      overlay.classList.remove('visible');
    }
  });

  canvas.addEventListener('dragover', (e) => {
    if (isExternalFileDrag(e)) {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'copy';
      overlay.classList.add('visible');
      return;
    }
    if (e.dataTransfer?.types.includes(VAULT_DRAG_TYPE)) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  });

  canvas.addEventListener('drop', async (e) => {
    e.preventDefault();
    dragDepth = 0;
    overlay.classList.remove('visible');
    clearDropHighlights();

    if (!cryptoKey || !currentDirHandle || !e.dataTransfer) return;

    if (e.dataTransfer.types.includes(VAULT_DRAG_TYPE)) {
      const encryptedName = e.dataTransfer.getData(VAULT_DRAG_TYPE);
      const source = dragEntry ?? findEntryInPath(currentPath, encryptedName);
      if (source && source.sourcePath !== currentPath) {
        await handleMoveEntry(source.entry, source.sourcePath, currentPath);
      }
      return;
    }

    if (!isExternalFileDrag(e)) return;

    try {
      setStatus('Importiere Dateien…', true);
      const count = await importFromDataTransfer(
        cryptoKey,
        currentDirHandle,
        e.dataTransfer.items,
        (msg) => setStatus(msg, true),
      );
      setStatus(`✓ ${count} Datei(en) importiert`);
      await handleRefresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Import fehlgeschlagen');
    }
  });
}

function setupDropTarget(el: HTMLElement, targetPath: string): void {
  el.addEventListener('dragover', (e) => {
    if (!canDropOnPath(e, targetPath)) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer!.dropEffect = e.dataTransfer?.types.includes(VAULT_DRAG_TYPE) ? 'move' : 'copy';
    el.classList.add('drop-target');
  });

  el.addEventListener('dragleave', (e) => {
    if (!el.contains(e.relatedTarget as Node)) {
      el.classList.remove('drop-target');
    }
  });

  el.addEventListener('drop', async (e) => {
    if (!canDropOnPath(e, targetPath)) return;
    e.preventDefault();
    e.stopPropagation();
    el.classList.remove('drop-target');
    clearDropHighlights();

    const overlay = document.getElementById('drop-overlay');
    overlay?.classList.remove('visible');

    if (!cryptoKey || !e.dataTransfer) return;

    const targetHandle = getDirHandleForPath(targetPath);
    if (!targetHandle) return;

    if (e.dataTransfer.types.includes(VAULT_DRAG_TYPE)) {
      const encryptedName = e.dataTransfer.getData(VAULT_DRAG_TYPE);
      const source = dragEntry ?? findEntryByEncryptedName(encryptedName);
      if (source) {
        await handleMoveEntry(source.entry, source.sourcePath, targetPath);
      }
      return;
    }

    if (!isExternalFileDrag(e)) return;

    try {
      setStatus('Importiere Dateien…', true);
      const count = await importFromDataTransfer(
        cryptoKey,
        targetHandle,
        e.dataTransfer.items,
        (msg) => setStatus(msg, true),
      );
      setStatus(`✓ ${count} Datei(en) importiert`);
      await handleRefresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Import fehlgeschlagen');
    }
  });
}

function setupGlobalDismiss(): void {
  document.addEventListener('click', () => closeContextMenu());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContextMenu();
  });
}

function isExternalFileDrag(e: DragEvent): boolean {
  return e.dataTransfer?.types.includes('Files') ?? false;
}

function canDropOnPath(e: DragEvent, targetPath: string): boolean {
  if (!e.dataTransfer) return false;

  if (e.dataTransfer.types.includes(VAULT_DRAG_TYPE)) {
    if (!dragEntry) return false;
    const sourcePath = dragEntry.sourcePath;
    if (sourcePath === targetPath) return false;
    if (dragEntry.entry.kind === 'directory') {
      const entryPath = sourcePath === '/' ? dragEntry.entry.decryptedName : `${sourcePath}/${dragEntry.entry.decryptedName}`;
      if (targetPath === entryPath || targetPath.startsWith(`${entryPath}/`)) return false;
    }
    return true;
  }

  return isExternalFileDrag(e);
}

function clearDropHighlights(): void {
  document.querySelectorAll('.drop-target').forEach((el) => el.classList.remove('drop-target'));
}

function findEntryByCard(card: HTMLElement): VaultEntry | undefined {
  const encryptedName = card.dataset.encryptedName;
  return currentEntries.find((e) => e.encryptedName === encryptedName);
}

function findEntryInPath(parentPath: string, encryptedName: string): { entry: VaultEntry; sourcePath: string } | null {
  if (parentPath === currentPath) {
    const entry = currentEntries.find((e) => e.encryptedName === encryptedName);
    return entry ? { entry, sourcePath: parentPath } : null;
  }
  return findEntryByEncryptedName(encryptedName);
}

function findEntryByEncryptedName(encryptedName: string): { entry: VaultEntry; sourcePath: string } | null {
  if (dragEntry?.entry.encryptedName === encryptedName) {
    return dragEntry;
  }
  const entry = currentEntries.find((e) => e.encryptedName === encryptedName);
  return entry ? { entry, sourcePath: currentPath } : null;
}

function getDirHandleForPath(path: string): FileSystemDirectoryHandle | null {
  if (!rootTree) return null;
  const node = findNode(rootTree, path);
  if (node?.kind === 'directory' && node.handle) {
    return node.handle as FileSystemDirectoryHandle;
  }
  return null;
}

function getParentPath(path: string): string {
  if (path === '/') return '/';
  const parts = path.split('/');
  parts.pop();
  return parts.length === 0 ? '/' : parts.join('/');
}

function showContextMenu(x: number, y: number, entry: VaultEntry, parentPath: string): void {
  contextMenu = { x, y, entry, parentPath };
  renderContextMenu();
}

function closeContextMenu(): void {
  contextMenu = null;
  document.querySelector('.context-menu')?.remove();
}

function renderContextMenu(): void {
  document.querySelector('.context-menu')?.remove();
  if (!contextMenu) return;

  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.left = `${contextMenu.x}px`;
  menu.style.top = `${contextMenu.y}px`;
  menu.innerHTML = `
    <button type="button" data-action="rename">Umbenennen</button>
    <button type="button" data-action="delete" class="danger">Löschen</button>
  `;

  menu.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = (btn as HTMLElement).dataset.action;
      const { entry, parentPath } = contextMenu!;
      closeContextMenu();
      if (action === 'rename') handleRenameEntry(entry, parentPath);
      else if (action === 'delete') handleDeleteEntry(entry, parentPath);
    });
  });

  document.body.appendChild(menu);

  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    menu.style.left = `${Math.max(0, window.innerWidth - rect.width - 8)}px`;
  }
  if (rect.bottom > window.innerHeight) {
    menu.style.top = `${Math.max(0, window.innerHeight - rect.height - 8)}px`;
  }
}

async function handleRenameEntry(entry: VaultEntry, parentPath: string): Promise<void> {
  if (!cryptoKey) return;

  const newName = window.prompt('Neuer Name:', entry.decryptedName);
  if (!newName || newName === entry.decryptedName) return;

  const parentHandle = getDirHandleForPath(parentPath);
  if (!parentHandle) return;

  try {
    setStatus(`Benenne um: ${entry.decryptedName}…`, true);
    await renameEntry(cryptoKey, parentHandle, entry, newName, (msg) => setStatus(msg, true));

    if (preview?.name === entry.decryptedName) {
      closePreview();
    }

    setStatus(`✓ Umbenannt in „${newName}"`);
    await handleRefresh();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Umbenennen fehlgeschlagen');
  }
}

async function handleDeleteEntry(entry: VaultEntry, parentPath: string): Promise<void> {
  if (!cryptoKey) return;

  const label = entry.kind === 'directory' ? 'Ordner' : 'Datei';
  const confirmed = window.confirm(
    `${label} „${entry.decryptedName}" wirklich löschen?${entry.kind === 'directory' ? '\n\nAlle Inhalte werden unwiderruflich gelöscht.' : ''}`,
  );
  if (!confirmed) return;

  const parentHandle = getDirHandleForPath(parentPath);
  if (!parentHandle) return;

  try {
    setStatus(`Lösche: ${entry.decryptedName}…`, true);
    await removeEntry(parentHandle, entry.encryptedName);

    if (preview?.name === entry.decryptedName) {
      closePreview();
    }

    setStatus(`✓ „${entry.decryptedName}" gelöscht`);
    await handleRefresh();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Löschen fehlgeschlagen');
  }
}

async function handleMoveEntry(entry: VaultEntry, sourcePath: string, targetPath: string): Promise<void> {
  if (!cryptoKey || sourcePath === targetPath) return;

  const sourceParent = getDirHandleForPath(sourcePath);
  const targetDir = getDirHandleForPath(targetPath);
  if (!sourceParent || !targetDir) return;

  try {
    setStatus(`Verschiebe: ${entry.decryptedName}…`, true);
    await moveEntry(cryptoKey, sourceParent, targetDir, entry, (msg) => setStatus(msg, true));

    if (preview?.name === entry.decryptedName) {
      closePreview();
    }

    setStatus(`✓ „${entry.decryptedName}" verschoben`);
    await handleRefresh();
  } catch (err) {
    setStatus(err instanceof Error ? err.message : 'Verschieben fehlgeschlagen');
  }
}

// ── Tree Helpers ──

function findNode(tree: VaultNode, path: string): VaultNode | null {
  if (tree.path === path) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNode(child, path);
      if (found) return found;
    }
  }
  return null;
}

function attachNode(tree: VaultNode, parentPath: string, newNode: VaultNode): void {
  const parent = findNode(tree, parentPath);
  if (!parent) return;
  if (!parent.children) parent.children = [];
  const existing = parent.children.find((c) => c.path === newNode.path);
  if (!existing) {
    parent.children.push(newNode);
  }
}

// ── Init ──

render();
