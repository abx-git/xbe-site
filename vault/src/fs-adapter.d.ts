import type { VaultEntry, VaultNode } from './types';

export function isFileSystemAccessSupported(): boolean;
export function pickDirectory(): Promise<FileSystemDirectoryHandle>;
export function listDirectory(
  key: CryptoKey,
  dirHandle: FileSystemDirectoryHandle,
  onProgress?: (msg: string) => void,
): Promise<VaultEntry[]>;
export function buildTree(
  key: CryptoKey,
  dirHandle: FileSystemDirectoryHandle,
  decryptedPath?: string,
): Promise<VaultNode>;
export function loadChildren(key: CryptoKey, node: VaultNode): Promise<VaultNode[]>;
export function readDecryptedFile(
  key: CryptoKey,
  fileHandle: FileSystemFileHandle,
): Promise<{ name: string; content: Uint8Array; mimeType: string }>;
export function updateEncryptedFileContent(
  key: CryptoKey,
  fileHandle: FileSystemFileHandle,
  content: ArrayBuffer,
  onProgress?: (msg: string) => void,
): Promise<void>;
export function writeEncryptedFile(
  key: CryptoKey,
  dirHandle: FileSystemDirectoryHandle,
  plainName: string,
  content: ArrayBuffer,
  onProgress?: (msg: string) => void,
): Promise<void>;
export function createEncryptedDirectory(
  key: CryptoKey,
  parentHandle: FileSystemDirectoryHandle,
  plainName: string,
): Promise<FileSystemDirectoryHandle>;
export function removeEntry(
  parentHandle: FileSystemDirectoryHandle,
  encryptedName: string,
): Promise<void>;
export function validatePlainName(name: string): string;
export function renameEntry(
  key: CryptoKey,
  parentHandle: FileSystemDirectoryHandle,
  entry: VaultEntry,
  newPlainName: string,
  onProgress?: (msg: string) => void,
): Promise<void>;
export function moveEntry(
  key: CryptoKey,
  sourceParent: FileSystemDirectoryHandle,
  targetDir: FileSystemDirectoryHandle,
  entry: VaultEntry,
  onProgress?: (msg: string) => void,
): Promise<void>;
export function importFromDataTransfer(
  key: CryptoKey,
  dirHandle: FileSystemDirectoryHandle,
  items: DataTransferItemList,
  onProgress?: (msg: string) => void,
): Promise<number>;
