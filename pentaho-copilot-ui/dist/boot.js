var d;if(document.currentScript!=null&&document.currentScript instanceof HTMLScriptElement){const e=new URL("./",document.currentScript.src.replace(/(^.*)(\/src)(\/)/,"$1$3")).toString(),t=document.createElement("script");t.async=!0,t.src=`${e}bundles/es-module-shims.js`,document.currentScript.after(t);const c=document.createElement("script");c.type="importmap",c.textContent=`{
  "imports": {
    "react": "${e}bundles/react.production.min.js",
    "react-dom": "${e}bundles/react-dom.production.min.js",
    "react-router-dom": "${e}bundles/react-router-dom.production.min.js",
    "@emotion/react": "${e}bundles/emotion-react.production.min.js",
    "@emotion/cache": "${e}bundles/emotion-cache.production.min.js",
    "@hitachivantara/app-shell-shared": "${e}bundles/app-shell-shared.esm.js",
    "@hitachivantara/uikit-react-shared": "${e}bundles/uikit-react-shared.esm.js",
    "@hv/uikit-icons/": "${e}icons/",
    "@hv-apps/genai-companion/": "${e}"
  }
}`,t.after(c);const i=document.currentScript.src.includes("/src/")&&document.currentScript.src.endsWith(".ts");if(i){const n=document.createElement("script");n.type="module",n.textContent=`import RefreshRuntime from "${e}@react-refresh"; RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => (type) => type; window.__vite_plugin_react_preamble_installed__ = true;`,document.body.append(n);const s=document.createElement("script");s.type="module",s.src=`${e}@vite/client`,n.append(s)}const a=document.createElement("div");a.id="boot-root",(d=document.body.querySelector(".aiCompanionButton"))==null||d.append(a);const r=document.createElement("link");r.rel="stylesheet",r.href="https://fonts.googleapis.com/css?family=Open+Sans:400,600",document.head.append(r);const o=document.createElement("script");o.type="module",o.src=new URL(i?"./start.tsx":"./start.js",document.currentScript.src).toString(),document.body.append(o)}
