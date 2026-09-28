export interface VaultEntry {
  encryptedName: string;
  decryptedName: string;
  kind: 'file' | 'directory';
  handle: FileSystemHandle;
}

export interface VaultNode {
  name: string;
  path: string;
  kind: 'file' | 'directory';
  handle?: FileSystemDirectoryHandle | FileSystemFileHandle;
  children?: VaultNode[];
  expanded?: boolean;
  loaded?: boolean;
}

export type AppPhase = 'unlock' | 'pick-directory' | 'explorer';

export type MarkdownEditMode = 'rich' | 'source';

export interface PreviewState {
  name: string;
  objectUrl: string;
  mimeType: string;
  textContent?: string;
  fileHandle?: FileSystemFileHandle;
  editable?: boolean;
  editMode?: boolean;
  markdownMode?: MarkdownEditMode;
  dirty?: boolean;
  zoom?: number;
}
