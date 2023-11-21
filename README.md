# Integrating App Shell Components in Legacy Codebases

This branch consists of two applications:

1. On the "old-app" folder, a static website served on port `3001`, representing a legacy codebase.
2. On the "chat-app" folder, an App Shell webapp, which exports React components as ES Modules.

The 'Old App' is set up to load resources from the App Shell webapp using a script tag that bootstraps the environment and imports the components.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install the App Shell project dependencies by running:

  ```bash
  cd chat-app
  npm install
  ```

## Starting the Applications

### Chat App

The Chat App can be run in two modes: development and preview.

- **Development Mode**:

  Runs the web app in a local development environment on port `5173`.

  ```bash
  cd chat-app
  npm run dev
  ```

  The webapp will be available at `http://localhost:5173`.

- **Preview Mode**:

  Provides a production-like environment on port `4173`.

  ```bash
  cd chat-app
  npm run build
  npm run preview
  ```

  The webapp will be available at `http://localhost:4173`.

### Old App

Run the following command in your terminal:

```bash
cd old-app
./start.sh
```

(or `start.bat` if you're on Windows)

The website will be available at `http://localhost:3001`.

Note that, by default, the script tags in `index.html` and `disk.html` are set for the development mode of the Chat App. If you want to test the preview mode, you'll need to change the script tag.

The scripts tags are located at the bottom of the HTML files and should look like this:

- **Development Mode**:

```html
<script src="http://localhost:5173/src/boot.ts"></script>
```

- **Preview Mode**:

```html
<script src="http://localhost:4173/boot.js"></script>
```

## Demonstration

After starting both applications, the static webpage should load resources from the App Shell webapp. Notably, a floating chat button should allow you to open the same chat window as the one found when accessing the App Shell webapp directly.

This exercises the integration of App Shell components in a legacy codebase that:

- Doesn't have an import map defined.
- Doesn't utilize React.
- Doesn't integrate with the App Shell.
- Operates as a Multi-Page Application (MPA) instead of a Single-Page Application (SPA).

The minimal-impact approach involves just the addition of a script tag in the body of the HTML files.

The bootstrapping script is responsible for:

- Defining the import map (by appending a script tag of type "importmap" to the document).
- Creating a div to mount the React application.
- Loading the React application entry point (by appending a script tag of type "module" to the document).

The script also: injects a shim for environments that don't fully support ES modules (basically Safari); loads the NEXT UI Kit font (from Google Fonts, so it requires access to the Internet); if in development mode, loads Vite client scripts to enable HMR and avoid preamble not found errors.

The React application entrypoint is responsible for:

- Setting up the React DOM root.
- Initializing the NEXT UI Kit's HvProvider with scoped CSS baseline and theme.
- Rendering the floating chat button component.

Furthermore, the components utilize the `sessionStorage` to be able to retain the chat window's state across page reloads. It is abstracted away in the custom hooks at `chat-app/src/utils/useRefreshSafeState.ts`.
