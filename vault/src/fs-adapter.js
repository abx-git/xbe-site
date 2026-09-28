/**
 * Dateisystem-Adapter: File System Access API mit verschlüsselten Datei- und Ordnernamen.
 */

import {
  decryptContent,
  decryptName,
  encryptContent,
  encryptName,
} from './crypto.js';

export function isFileSystemAccessSupported() {
  return typeof window.showDirectoryPicker === 'function';
}

/** Lokales Verzeichnis über die File System Access API auswählen. */
export async function pickDirectory() {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API wird von diesem Browser nicht unterstützt.');
  }
  return window.showDirectoryPicker({ mode: 'readwrite' });
}

/** Einen Eintrag (Datei oder Ordner) im Verzeichnis entschlüsseln. */
async function decryptEntry(key, name, handle) {
  try {
    const decryptedName = await decryptName(key, name);
    const kind = handle.kind;
    return { encryptedName: name, decryptedName, kind, handle };
  } catch {
    return null;
  }
}

/** Alle Einträge eines Verzeichnisses lesen und Namen entschlüsseln. */
export async function listDirectory(key, dirHandle, onProgress) {
  const entries = [];

  for await (const [name, handle] of dirHandle.entries()) {
    onProgress?.(`Entschlüssele: ${name.slice(0, 20)}…`);
    const entry = await decryptEntry(key, name, handle);
    if (entry) {
      entries.push(entry);
    }
  }

  entries.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1;
    return a.decryptedName.localeCompare(b.decryptedName, 'de');
  });

  return entries;
}

/** Rekursiv einen Ordnerbaum aufbauen (lazy: nur erste Ebene pro Knoten). */
export async function buildTree(key, dirHandle, decryptedPath = '') {
  const entries = await listDirectory(key, dirHandle);
  const children = [];

  for (const entry of entries) {
    if (entry.kind === 'directory') {
      children.push({
        name: entry.decryptedName,
        path: decryptedPath ? `${decryptedPath}/${entry.decryptedName}` : entry.decryptedName,
        kind: 'directory',
        handle: entry.handle,
        children: [],
        expanded: false,
        loaded: false,
      });
    } else {
      children.push({
        name: entry.decryptedName,
        path: decryptedPath ? `${decryptedPath}/${entry.decryptedName}` : entry.decryptedName,
        kind: 'file',
        handle: entry.handle,
      });
    }
  }

  return {
    name: decryptedPath ? decryptedPath.split('/').pop() : 'Root',
    path: decryptedPath || '/',
    kind: 'directory',
    handle: dirHandle,
    children,
    expanded: true,
    loaded: true,
  };
}

/** Unterordner-Kinder nachladen. */
export async function loadChildren(key, node) {
  if (node.kind !== 'directory' || !node.handle) return [];

  const entries = await listDirectory(key, node.handle, undefined);
  return entries.map((entry) => {
    if (entry.kind === 'directory') {
      return {
        name: entry.decryptedName,
        path: node.path === '/' ? entry.decryptedName : `${node.path}/${entry.decryptedName}`,
        kind: 'directory',
        handle: entry.handle,
        children: [],
        expanded: false,
        loaded: false,
      };
    }
    return {
      name: entry.decryptedName,
      path: node.path === '/' ? entry.decryptedName : `${node.path}/${entry.decryptedName}`,
      kind: 'file',
      handle: entry.handle,
    };
  });
}

/** Dateiinhalt lesen und im RAM entschlüsseln. */
export async function readDecryptedFile(key, fileHandle) {
  const encryptedName = fileHandle.name;
  const name = await decryptName(key, encryptedName);
  const file = await fileHandle.getFile();
  const encrypted = await file.arrayBuffer();
  const content = await decryptContent(key, encrypted);
  const mimeType = guessMimeType(name);
  return { name, content, mimeType };
}

/**
 * Bestehenden verschlüsselten Dateiinhalt im RAM verschlüsseln und direkt überschreiben.
 * Es wird kein unverschlüsseltes Fragment auf die Festplatte geschrieben.
 */
export async function updateEncryptedFileContent(key, fileHandle, content, onProgress) {
  onProgress?.('Verschlüssele Änderungen…');
  const encryptedContent = await encryptContent(key, content);
  const writable = await fileHandle.createWritable();
  const buffer = encryptedContent.buffer.slice(
    encryptedContent.byteOffset,
    encryptedContent.byteOffset + encryptedContent.byteLength,
  );
  await writable.write(buffer);
  await writable.close();
  onProgress?.('Gespeichert (verschlüsselt)');
}

/** Verschlüsselte Datei ins Verzeichnis schreiben. */
export async function writeEncryptedFile(key, dirHandle, plainName, content, onProgress) {
  onProgress?.(`Verschlüssele: ${plainName}`);
  const encryptedName = await encryptName(key, plainName);
  const encryptedContent = await encryptContent(key, content);

  const fileHandle = await dirHandle.getFileHandle(encryptedName, { create: true });
  const writable = await fileHandle.createWritable();
  const buffer = encryptedContent.buffer.slice(
    encryptedContent.byteOffset,
    encryptedContent.byteOffset + encryptedContent.byteLength,
  );
  await writable.write(buffer);
  await writable.close();
  onProgress?.(`Gespeichert: ${plainName}`);
}

/** Verschlüsselten Ordner anlegen. */
export async function createEncryptedDirectory(key, parentHandle, plainName) {
  const encryptedName = await encryptName(key, plainName);
  return parentHandle.getDirectoryHandle(encryptedName, { create: true });
}

/** Datei oder Ordner löschen. */
export async function removeEntry(parentHandle, encryptedName) {
  await parentHandle.removeEntry(encryptedName, { recursive: true });
}

/** Klartextnamen validieren. */
export function validatePlainName(name) {
  const trimmed = name?.trim() ?? '';
  if (!trimmed) {
    throw new Error('Name darf nicht leer sein.');
  }
  if (trimmed.includes('/') || trimmed.includes('\\')) {
    throw new Error('Name darf keinen Schrägstrich enthalten.');
  }
  if (trimmed === '.' || trimmed === '..') {
    throw new Error('Ungültiger Name.');
  }
  return trimmed;
}

async function hasEntryWithName(key, dirHandle, plainName) {
  const entries = await listDirectory(key, dirHandle);
  return entries.some((e) => e.decryptedName === plainName);
}

async function copyDirectoryContents(key, sourceDir, targetDir, onProgress) {
  const entries = await listDirectory(key, sourceDir);
  for (const child of entries) {
    if (child.kind === 'file') {
      const file = await child.handle.getFile();
      const encrypted = await file.arrayBuffer();
      const content = await decryptContent(key, encrypted);
      const buffer = content.buffer.slice(
        content.byteOffset,
        content.byteOffset + content.byteLength,
      );
      await writeEncryptedFile(key, targetDir, child.decryptedName, buffer, onProgress);
    } else {
      const subDir = await createEncryptedDirectory(key, targetDir, child.decryptedName);
      await copyDirectoryContents(key, child.handle, subDir, onProgress);
    }
  }
}

/** Datei oder Ordner umbenennen (neuer verschlüsselter Dateiname). */
export async function renameEntry(key, parentHandle, entry, newPlainName, onProgress) {
  const name = validatePlainName(newPlainName);
  if (name === entry.decryptedName) return;

  if (await hasEntryWithName(key, parentHandle, name)) {
    throw new Error(`„${name}" existiert bereits.`);
  }

  if (entry.kind === 'file') {
    onProgress?.(`Benenne um: ${entry.decryptedName} → ${name}`);
    const file = await entry.handle.getFile();
    const encrypted = await file.arrayBuffer();
    const content = await decryptContent(key, encrypted);
    const buffer = content.buffer.slice(
      content.byteOffset,
      content.byteOffset + content.byteLength,
    );
    await writeEncryptedFile(key, parentHandle, name, buffer, onProgress);
    await removeEntry(parentHandle, entry.encryptedName);
    return;
  }

  onProgress?.(`Benenne Ordner um: ${entry.decryptedName} → ${name}`);
  const newDir = await createEncryptedDirectory(key, parentHandle, name);
  await copyDirectoryContents(key, entry.handle, newDir, onProgress);
  await removeEntry(parentHandle, entry.encryptedName);
}

/** Datei oder Ordner in einen anderen Ordner verschieben. */
export async function moveEntry(key, sourceParent, targetDir, entry, onProgress) {
  if (sourceParent === targetDir) return;

  if (await hasEntryWithName(key, targetDir, entry.decryptedName)) {
    throw new Error(`„${entry.decryptedName}" existiert im Zielordner bereits.`);
  }

  onProgress?.(`Verschiebe: ${entry.decryptedName}`);

  if (typeof sourceParent.move === 'function') {
    await sourceParent.move(entry.handle, targetDir);
    return;
  }

  if (entry.kind === 'file') {
    const file = await entry.handle.getFile();
    const encrypted = await file.arrayBuffer();
    const content = await decryptContent(key, encrypted);
    const buffer = content.buffer.slice(
      content.byteOffset,
      content.byteOffset + content.byteLength,
    );
    await writeEncryptedFile(key, targetDir, entry.decryptedName, buffer, onProgress);
    await removeEntry(sourceParent, entry.encryptedName);
    return;
  }

  const newDir = await createEncryptedDirectory(key, targetDir, entry.decryptedName);
  await copyDirectoryContents(key, entry.handle, newDir, onProgress);
  await removeEntry(sourceParent, entry.encryptedName);
}

function guessMimeType(filename) {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  const map = {
    txt: 'text/plain',
    md: 'text/markdown',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    ts: 'text/typescript',
    json: 'application/json',
    xml: 'application/xml',
    svg: 'image/svg+xml',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    avif: 'image/avif',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    csv: 'text/csv',
    yaml: 'text/yaml',
    yml: 'text/yaml',
  };
  return map[ext] ?? 'application/octet-stream';
}

async function resolveUniqueFilename(key, dirHandle, desiredName) {
  if (!(await hasEntryWithName(key, dirHandle, desiredName))) {
    return desiredName;
  }

  const dot = desiredName.lastIndexOf('.');
  const base = dot > 0 ? desiredName.slice(0, dot) : desiredName;
  const ext = dot > 0 ? desiredName.slice(dot) : '';

  for (let n = 1; n < 1000; n++) {
    const candidate = `${base} (${n})${ext}`;
    if (!(await hasEntryWithName(key, dirHandle, candidate))) {
      return candidate;
    }
  }

  return `${base}-${Date.now()}${ext}`;
}

async function importFilesFromItems(key, dirHandle, items, onProgress) {
  let count = 0;

  const processEntry = async (entry, targetDir) => {
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => {
        entry.file(resolve, reject);
      });
      const filename = await resolveUniqueFilename(key, targetDir, file.name);
      await writeEncryptedFile(key, targetDir, filename, await file.arrayBuffer(), onProgress);
      count++;
    } else if (entry.isDirectory) {
      const subDir = await createEncryptedDirectory(key, targetDir, entry.name);
      const reader = entry.createReader();
      const readEntries = () =>
        new Promise((resolve, reject) => {
          reader.readEntries(resolve, reject);
        });

      let entries;
      do {
        entries = await readEntries();
        for (const child of entries) {
          await processEntry(child, subDir);
        }
      } while (entries.length > 0);
    }
  };

  for (const item of items) {
    const entry = item.webkitGetAsEntry?.();
    if (entry) {
      await processEntry(entry, dirHandle);
    } else if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        const filename = await resolveUniqueFilename(key, dirHandle, file.name);
        await writeEncryptedFile(key, dirHandle, filename, await file.arrayBuffer(), onProgress);
        count++;
      }
    }
  }

  return count;
}

/** Prüft, ob ein Drag-Vorgang lokale Dateien enthält (kein Netzwerk nötig). */
export function isImportableDrag(dataTransfer) {
  return dataTransfer?.types.includes('Files') ?? false;
}

/** Drag-and-Drop: lokale Dateien und Ordner importieren. */
export async function importFromDrop(key, dirHandle, dataTransfer, onProgress) {
  return importFilesFromItems(key, dirHandle, dataTransfer.items, onProgress);
}

function extensionFromMime(mime) {
  const map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg',
    'text/plain': 'txt',
    'text/html': 'html',
    'text/markdown': 'md',
    'text/csv': 'csv',
    'application/json': 'json',
    'application/pdf': 'pdf',
  };
  return map[mime] ?? null;
}

function defaultFilenameFromFile(file) {
  if (file.name) return file.name;
  const ext = extensionFromMime(file.type) ?? 'bin';
  return `paste.${ext}`;
}

function inferTextFilename(text, mimeType) {
  if (mimeType === 'text/html') return 'paste.html';
  if (mimeType === 'text/markdown') return 'paste.md';
  if (mimeType === 'text/csv') return 'paste.csv';
  if (mimeType === 'application/json') return 'paste.json';

  const trimmed = text.trim();
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      JSON.parse(trimmed);
      return 'paste.json';
    } catch {
      // kein gültiges JSON
    }
  }

  return 'paste.txt';
}

async function importClipboardFileItems(key, dirHandle, fileItems, onProgress) {
  let count = 0;

  for (const item of fileItems) {
    const file = item.getAsFile?.() ?? (item instanceof File ? item : null);
    if (!file) continue;

    const filename = await resolveUniqueFilename(key, dirHandle, defaultFilenameFromFile(file));
    await writeEncryptedFile(key, dirHandle, filename, await file.arrayBuffer(), onProgress);
    count++;
  }

  return count;
}

async function importClipboardText(key, dirHandle, text, mimeType, onProgress) {
  if (!text) return 0;

  const filename = await resolveUniqueFilename(key, dirHandle, inferTextFilename(text, mimeType));
  const encoded = new TextEncoder().encode(text);
  const buffer = encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength);
  await writeEncryptedFile(key, dirHandle, filename, buffer, onProgress);
  return 1;
}

/** Zwischenablage-Inhalt importieren (Paste-Event oder Clipboard API). */
export async function importFromClipboard(key, dirHandle, clipboardData, onProgress) {
  const fileItems = [...clipboardData.items].filter((item) => item.kind === 'file');
  const fileCount = await importClipboardFileItems(key, dirHandle, fileItems, onProgress);
  if (fileCount > 0) return fileCount;

  const types = clipboardData.types ?? [];
  if (types.includes('text/plain')) {
    const text = clipboardData.getData('text/plain');
    const count = await importClipboardText(key, dirHandle, text, 'text/plain', onProgress);
    if (count > 0) return count;
  }

  if (types.includes('text/html')) {
    const html = clipboardData.getData('text/html');
    const count = await importClipboardText(key, dirHandle, html, 'text/html', onProgress);
    if (count > 0) return count;
  }

  return 0;
}

/** Zwischenablage über die Clipboard API lesen (z. B. Kontextmenü „Einfügen“). */
export async function importFromNavigatorClipboard(key, dirHandle, onProgress) {
  if (!navigator.clipboard?.read) {
    throw new Error('Zwischenablage-Zugriff wird von diesem Browser nicht unterstützt.');
  }

  const clipboardItems = await navigator.clipboard.read();
  const fileItems = [];

  for (const clipItem of clipboardItems) {
    for (const type of clipItem.types) {
      if (type === 'text/plain' || type === 'text/html') continue;

      const blob = await clipItem.getType(type);
      const ext = extensionFromMime(type) ?? 'bin';
      const file = new File([blob], `paste.${ext}`, { type });
      fileItems.push(file);
    }
  }

  const fileCount = await importClipboardFileItems(key, dirHandle, fileItems, onProgress);
  if (fileCount > 0) return fileCount;

  for (const clipItem of clipboardItems) {
    if (clipItem.types.includes('text/plain')) {
      const blob = await clipItem.getType('text/plain');
      const text = await blob.text();
      const count = await importClipboardText(key, dirHandle, text, 'text/plain', onProgress);
      if (count > 0) return count;
    }
  }

  for (const clipItem of clipboardItems) {
    if (clipItem.types.includes('text/html')) {
      const blob = await clipItem.getType('text/html');
      const html = await blob.text();
      const count = await importClipboardText(key, dirHandle, html, 'text/html', onProgress);
      if (count > 0) return count;
    }
  }

  return 0;
}

/** @deprecated Verwende importFromDrop – behält Abwärtskompatibilität. */
export async function importFromDataTransfer(key, dirHandle, items, onProgress) {
  const proxy = { items, getData: () => '' };
  return importFromDrop(key, dirHandle, proxy, onProgress);
}
