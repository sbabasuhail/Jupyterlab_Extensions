import { Token } from '@lumino/coreutils';

export interface AppShellSetupManager {
  done: boolean;
  isConfigured: (id: string) => boolean;
}

export const AppShellSetupManager = new Token<AppShellSetupManager>(
  '@hv-apps/chat-jupyterlab-ext:AppShellSetupManager',
  'Status of the AppShell setup'
);
