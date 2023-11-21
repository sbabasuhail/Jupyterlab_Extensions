import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette,
  MainAreaWidget,
  WidgetTracker
} from '@jupyterlab/apputils';

import { AppShellSetupManager } from '../app-shell-setup-ext/tokens';

import { ChatCompanionWidget } from './ChatCompanion';

/**
 * The command IDs used by the chat companion plugin.
 */
namespace CommandIDs {
  export const openChat = 'chat-companion:open';
  export const closeChat = 'chat-companion:close';
  export const togglePanelChat = 'chat-companion:toggle-panel';
}

/**
 * The main chat companion plugin.
 */
export const chatCompanion: JupyterFrontEndPlugin<void> = {
  id: '@hv-apps/chat-jupyterlab-ext:chat-companion',
  autoStart: true,
  requires: [ILayoutRestorer, AppShellSetupManager],
  optional: [ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    appShellSetup: AppShellSetupManager | null,
    palette: ICommandPalette | null
  ) => {
    if (
      !appShellSetup?.done ||
      !appShellSetup.isConfigured('@hv-apps/genai-companion')
    ) {
      console.error(
        "Chat companion can't be activated: @hv-apps/genai-companion is not configured. Use the AppShell Setup Plugin to configure it."
      );
      return;
    }

    const { commands } = app;

    const tracker = new WidgetTracker<MainAreaWidget<ChatCompanionWidget>>({
      namespace: 'chat-companion'
    });

    let chatWidget: MainAreaWidget<ChatCompanionWidget>;

    const createChatWidget = (area: string): void => {
      if (chatWidget == null || chatWidget.isDisposed) {
        const content = new ChatCompanionWidget();

        chatWidget = new MainAreaWidget({ content });
        chatWidget.id = 'chat-companion-' + area;
        chatWidget.title.label = 'Chat Companion';
        chatWidget.title.closable = true;
      }

      if (!tracker.has(chatWidget)) {
        tracker.add(chatWidget);
      }

      if (!chatWidget.isAttached) {
        app.shell.add(chatWidget, area);
      }
      app.shell.activateById(chatWidget.id);
    };

    const removeChatWidget = (): void => {
      if (chatWidget != null && !chatWidget.isDisposed) {
        chatWidget.dispose();
      }
    };

    let area = 'main'; // Default area where the widget appears

    commands.addCommand(CommandIDs.openChat, {
      label: 'Open Chat Companion',
      execute: () => {
        createChatWidget(area);
      }
    });

    commands.addCommand(CommandIDs.closeChat, {
      label: 'Close Chat Companion',
      execute: () => {
        removeChatWidget();
      }
    });

    commands.addCommand(CommandIDs.togglePanelChat, {
      label: 'Show Chat Companion on the sidebar',
      execute: () => {
        const newArea = area === 'main' ? 'right' : 'main';
        area = newArea;

        // if there is already an opened widget, move it to the new area
        if (chatWidget != null && !chatWidget.isDisposed) {
          removeChatWidget();

          // Create a new widget in the new area
          createChatWidget(newArea);
        }
      },
      isToggled: () => area === 'right'
    });

    if (palette) {
      palette.addItem({ command: CommandIDs.openChat, category: 'Chat' });
      palette.addItem({ command: CommandIDs.closeChat, category: 'Chat' });
      palette.addItem({
        command: CommandIDs.togglePanelChat,
        category: 'Chat'
      });
    }

    if (restorer) {
      restorer.restore(tracker, {
        command: CommandIDs.openChat,
        name: () => 'chat-companion'
      });
    }
  }
};
