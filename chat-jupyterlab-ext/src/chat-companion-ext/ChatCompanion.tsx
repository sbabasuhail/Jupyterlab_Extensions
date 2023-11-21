import * as React from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import useJpTheme from '../app-shell-setup-ext/utils';

/**
 * @hv-apps/genai-companion is not a dependency of the package (it's a remote application),
 * so we need to use webpackIgnore to avoid webpack trying to bundle it,
 * and ts-ignore to avoid typescript complaining about the import.
 *
 * It also can't be externalized because the webpack's target environment doesn't
 * support dynamic import() syntax. But the runtime environment does, so we just
 * want webpack to leave it exactly as it is.
 */
const ChatPanel = React.lazy(
  () =>
    import(
      // @ts-ignore
      /* webpackIgnore: true */ '@hv-apps/genai-companion/jupyterlab/ChatWidget.js'
    )
);

interface ChatCompanionProps {
  id: string;
}

function ChatCompanionComponent({ id }: ChatCompanionProps) {
  const { themeLight } = useJpTheme();

  return (
    <React.Suspense>
      <ChatPanel
        containerId={id}
        darkMode={!themeLight}
        alwaysExpanded
        hideCloseButton
      />
    </React.Suspense>
  );
}

export class ChatCompanionWidget extends ReactWidget {
  render() {
    // here we are still at Lumino widget level, so we can't use hooks
    return <ChatCompanionComponent id={this.id} />;
  }
}
