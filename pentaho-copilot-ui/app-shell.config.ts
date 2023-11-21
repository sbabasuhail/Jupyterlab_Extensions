import type { HvAppShellConfig } from "@hitachivantara/app-shell";

const isDev = process.env.NODE_ENV === "development";

export default (): HvAppShellConfig => ({
  name: "VSP One for Object",
  logo: { name: "HITACHI" },

  apps: [
    {
      id: "@self",
      baseUrl: isDev ? "/" : "/",
      views: [{ bundle: "src/pages/Chat", route: "/chat" }],
      modules: [
        { bundle: "src/components/HeaderButton" },
        // scripts for injecting the chat panel into the old app
        { bundle: "src/components/ChatPanel" },
        { bundle: "src/boot" },
        { bundle: "src/start" },
         // entry point for jupyterlab extension
        { bundle: "src/jupyterlab/ChatWidget" },
      ],
    },
  ],

  menu: [
    {
      target: "/chat",
      label: "Overview"
    }
  ],

  header: {
    actions: [
      {
        bundle: isDev
          ? "@hv-apps/genai-companion/src/components/HeaderButton"
          : "@hv-apps/genai-companion/components/HeaderButton.js"
      },
      {
        bundle: "@hv/theming-client/colorModeSwitcher.js"
      },
    ],
  },

  translations: {
    en: {
      key_chat: "Chat",
    },
  },
});
