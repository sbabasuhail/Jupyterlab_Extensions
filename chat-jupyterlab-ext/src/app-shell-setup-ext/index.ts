import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { AppShellSetupManager } from './tokens';

const registry = {} as Record<string, string>;

function setupAppShell(registry: Record<string, string>) {
  /**
   * Hacking zone: using webpack's functions and constants to
   * integrate the ES Module based App Shell with the Module Federation based JupyterLab
   */
  /* @ts-ignore */
  globalThis.__appshell_integration_hack__webpack_require__ =
    /* @ts-ignore */
    /* webpackIgnore: true */ __webpack_require__;

  // @ts-ignore
  const packageRoot = __webpack_public_path__;
  /**
   * End of hacking zone
   */

  // Load ES module shims for environments that don't fully support ES modules (basically Safari)
  const esModuleShims = document.createElement('script');
  esModuleShims.async = true;
  esModuleShims.src = `${packageRoot}bundles/es-module-shims.js`;
  document.head.append(esModuleShims);

  // Define the import map which dictate where to find shared dependencies ES modules
  const packages = Object.entries(registry)
    .map(([key, value]) => {
      const id = decodeURIComponent(key);
      const bundleUrl = decodeURIComponent(value);
      return `"${decodeURIComponent(id)}${
        id.endsWith('/') ? '' : '/'
      }": "${bundleUrl}${bundleUrl.endsWith('/') ? '' : '/'}"`;
    })
    .join(',');

  const im = document.createElement('script');
  im.type = 'importmap';
  im.textContent = `{
  "imports": {
    "react": "${packageRoot}bundles/react-from-webpack.js",
    "react-dom": "${packageRoot}bundles/react-dom.production.min.js",
    "react-router-dom": "${packageRoot}bundles/react-router-dom.production.min.js",
    "@emotion/react": "${packageRoot}bundles/emotion-react.production.min.js",
    "@emotion/cache": "${packageRoot}bundles/emotion-cache.production.min.js",
    "@hitachivantara/app-shell-shared": "${packageRoot}bundles/app-shell-shared.esm.js",
    "@hitachivantara/uikit-react-shared": "${packageRoot}bundles/uikit-react-shared.esm.js",
    "@hv/uikit-icons/": "${packageRoot}icons/"${packages ? `,${packages}` : ''}
  }
}`;
  esModuleShims.after(im);

  // Load NEXT UI Kit font
  // as is, it requires access to the Internet... to avoid that we would have to bundle the font with the extension
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,600';
  document.head.append(link);
}

export const appShellSetup: JupyterFrontEndPlugin<AppShellSetupManager> = {
  id: '@hv-apps/chat-jupyterlab-ext:app-shell-setup',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    if (settingRegistry) {
      const settings = await settingRegistry.load(appShellSetup.id);

      const packages = settings.composite.packages as Array<any> | null;
      if (packages != null && packages.length > 0) {
        packages.forEach((pkg: any) => {
          registry[pkg.id] = pkg.bundleUrl;
        });
      }
    }

    setupAppShell(registry);

    return {
      done: true,
      isConfigured: (id: string) => {
        return id in registry;
      }
    };
  },
  provides: AppShellSetupManager
};
