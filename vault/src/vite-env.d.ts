/// <reference types="vite/client" />

interface FileSystemHandle {
  readonly kind: 'file' | 'directory';
  readonly name: string;
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: 'directory';
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
  removeEntry(name: string, options?: { recursive?: boolean }): Promise<void>;
}

interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string): Promise<void>;
  close(): Promise<void>;
}

interface FileSystemEntry {
  readonly isFile: boolean;
  readonly isDirectory: boolean;
  readonly name: string;
}

interface FileSystemFileEntry extends FileSystemEntry {
  readonly isFile: true;
  file(successCallback: (file: File) => void, errorCallback?: (err: DOMException) => void): void;
}

interface FileSystemDirectoryEntry extends FileSystemEntry {
  readonly isDirectory: true;
  createReader(): FileSystemDirectoryReader;
}

interface FileSystemDirectoryReader {
  readEntries(
    successCallback: (entries: FileSystemEntry[]) => void,
    errorCallback?: (err: DOMException) => void,
  ): void;
}

interface DataTransferItem {
  webkitGetAsEntry(): FileSystemEntry | null;
}

interface Window {
  showDirectoryPicker(options?: { mode?: 'read' | 'readwrite' }): Promise<FileSystemDirectoryHandle>;
}
