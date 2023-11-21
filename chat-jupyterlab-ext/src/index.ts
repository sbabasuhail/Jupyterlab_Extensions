import { JupyterFrontEndPlugin } from '@jupyterlab/application';

import { appShellSetup } from './app-shell-setup-ext';
import { chatCompanion } from './chat-companion-ext';

const plugins: JupyterFrontEndPlugin<any>[] = [appShellSetup, chatCompanion];

export default plugins;
