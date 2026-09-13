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

/** Drag-and-Drop: Datei(en) und Ordner rekursiv importieren. */
export async function importFromDataTransfer(key, dirHandle, items, onProgress) {
  let count = 0;

  const processEntry = async (entry, targetDir) => {
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => {
        entry.file(resolve, reject);
      });
      await writeEncryptedFile(key, targetDir, file.name, await file.arrayBuffer(), onProgress);
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
        await writeEncryptedFile(key, dirHandle, file.name, await file.arrayBuffer(), onProgress);
        count++;
      }
    }
  }

  return count;
}
