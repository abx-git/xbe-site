export type AppView = 'login' | 'home';

export interface InstructionSummary {
  id: string;
  title: string;
  version: string;
  updatedAt: string;
}

export interface LocalArtifactDraft {
  id: string;
  instructionId: string;
  fileName: string;
  sha256: string;
  createdAt: string;
  syncStatus: 'local' | 'uploading' | 'published' | 'error';
}
