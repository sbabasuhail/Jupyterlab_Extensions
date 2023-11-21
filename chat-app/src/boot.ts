// Ensure the current script is correctly detected
if (
  document.currentScript != null &&
  document.currentScript instanceof HTMLScriptElement
) {
  // Determine the base path for all resources from the current script's location
  const packageRoot = new URL(
    "./",
    document.currentScript.src.replace(/(^.*)(\/src)(\/)/, "$1$3")
  ).toString();

  // Load ES module shims for environments that don't fully support ES modules (basically Safari)
  const esModuleShims = document.createElement("script");
  esModuleShims.async = true;
  esModuleShims.src = `${packageRoot}bundles/es-module-shims.js`;
  document.currentScript.after(esModuleShims);

  // Define the import map which dictate where to find shared dependencies ES modules
  const im = document.createElement("script");
  im.type = "importmap";
  im.textContent = `{
  "imports": {
    "react": "${packageRoot}bundles/react.production.min.js",
    "react-dom": "${packageRoot}bundles/react-dom.production.min.js",
    "react-router-dom": "${packageRoot}bundles/react-router-dom.production.min.js",
    "@emotion/react": "${packageRoot}bundles/emotion-react.production.min.js",
    "@emotion/cache": "${packageRoot}bundles/emotion-cache.production.min.js",
    "@hitachivantara/app-shell-shared": "${packageRoot}bundles/app-shell-shared.esm.js",
    "@hitachivantara/uikit-react-shared": "${packageRoot}bundles/uikit-react-shared.esm.js",
    "@hv/uikit-icons/": "${packageRoot}icons/",
    "@hv-apps/chat-app/": "${packageRoot}"
  }
}`;
  esModuleShims.after(im);

  // Check if we're in development mode
  const isDev =
    document.currentScript.src.includes("/src/") &&
    document.currentScript.src.endsWith(".ts");

  // If in development mode, load Vite client scripts to enable HMR and avoid preamble not found errors
  if (isDev) {
    const reactRefresh = document.createElement("script");
    reactRefresh.type = "module";
    reactRefresh.textContent = `import RefreshRuntime from "${packageRoot}@react-refresh"; RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => (type) => type; window.__vite_plugin_react_preamble_installed__ = true;`;
    document.body.append(reactRefresh);

    const viteClient = document.createElement("script");
    viteClient.type = "module";
    viteClient.src = `${packageRoot}@vite/client`;
    reactRefresh.append(viteClient);
  }

  // Create a container for the React component
  const reactRootDiv = document.createElement("div");
  reactRootDiv.id = "boot-root";
  document.body.querySelector(".container")?.append(reactRootDiv);

  // Load NEXT UI Kit font (as is, requires access to the Internet)
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css?family=Open+Sans:400,600";
  document.head.append(link);

  // Bootstrap the actual React application
  const appShell = document.createElement("script");
  appShell.type = "module";
  appShell.src = new URL(
    isDev ? "./start.tsx" : "./start.js",
    document.currentScript.src
  ).toString();
  document.body.append(appShell);
}
