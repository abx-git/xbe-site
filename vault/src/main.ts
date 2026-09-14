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
  pickDirectory,
  readDecryptedFile,
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
        <div class="main-panel">
          <div class="breadcrumb" id="breadcrumb"></div>
          <div class="file-grid" id="file-grid"></div>
          <div class="dropzone" id="dropzone">
            Dateien oder Ordner hierher ziehen zum Importieren
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
  setupDropzone();

  app.querySelector('#refresh-btn')?.addEventListener('click', handleRefresh);
  app.querySelector('#lock-btn')?.addEventListener('click', handleLock);
}

function renderTree(): void {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar || !rootTree) return;
  sidebar.innerHTML = renderTreeNode(rootTree, 0);

  sidebar.querySelectorAll('.tree-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = (item as HTMLElement).dataset.path;
      if (!path) return;

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
    span.addEventListener('click', () => {
      const path = (span as HTMLElement).dataset.path!;
      const node = findNode(rootTree!, path);
      if (node && node.kind === 'directory') {
        navigateToDirectory(node);
      }
    });
  });
}

function renderFileGrid(): void {
  const grid = document.getElementById('file-grid');
  if (!grid) return;

  if (currentEntries.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span>📭</span><span>Dieser Ordner ist leer</span></div>`;
    return;
  }

  grid.innerHTML = currentEntries
    .map(
      (entry) => `
      <div class="file-card" data-name="${escapeHtml(entry.decryptedName)}" data-kind="${entry.kind}">
        <span class="file-icon">${fileIcon(entry.decryptedName, entry.kind)}</span>
        <span class="file-name">${escapeHtml(entry.decryptedName)}</span>
      </div>
    `,
    )
    .join('');

  grid.querySelectorAll('.file-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = (card as HTMLElement).dataset.name!;
      const kind = (card as HTMLElement).dataset.kind!;
      const entry = currentEntries.find((e) => e.decryptedName === name);
      if (!entry) return;

      if (kind === 'directory') {
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

    card.addEventListener('dblclick', () => {
      const name = (card as HTMLElement).dataset.name!;
      const kind = (card as HTMLElement).dataset.kind!;
      const entry = currentEntries.find((e) => e.decryptedName === name);
      if (!entry || kind !== 'file') return;
      openFilePreview(entry);
    });
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

function setupDropzone(): void {
  const dropzone = document.getElementById('dropzone');
  if (!dropzone) return;

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });

  dropzone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');

    if (!cryptoKey || !currentDirHandle || !e.dataTransfer) return;

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
