import type { HvAppShellConfig } from "@hitachivantara/app-shell";

export default (): HvAppShellConfig => ({
  name: "Chat App",

  apps: [
    {
      id: "@self",
      baseUrl: "/",
      views: [{ bundle: "src/pages/Chat", route: "/chat" }],
      modules: [
        { bundle: "src/components/HeaderButton" },

        { bundle: "src/components/ChatPanel" },

        // scripts for injecting the chat panel into the old app
        { bundle: "src/boot" },
        { bundle: "src/start" },

        // entry point for jupyterlab extension
        { bundle: "src/jupyterlab/ChatWidget" },
      ],
    },
  ],

  header: {
    actions: [
      // adding twice for it to run either on dev mode or preview
      {
        bundle: "@hv-apps/chat-app/src/components/HeaderButton",
      },
      {
        bundle: "@hv-apps/chat-app/components/HeaderButton.js",
      },
      {
        bundle: "@hv/theming-client/colorModeSwitcher.js",
      },
    ],
  },

  menu: [{ label: "key_chat", target: "/chat" }],

  translations: {
    en: {
      key_chat: "Chat",
    },
  },
});
