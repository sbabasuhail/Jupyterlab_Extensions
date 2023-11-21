import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { withProvider } from "providers/Provider";
import FloatingButton from "components/FloatingButton";
import { HvProvider } from "@hitachivantara/uikit-react-core";

const rootElement = document.getElementById("boot-root");

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);
  const FloatingButtonWithProvider = withProvider(FloatingButton);

  root.render(
    <Suspense fallback>
      <HvProvider
        rootElementId="boot-root"
        cssBaseline="scoped"
        cssTheme="scoped"
      >
        <FloatingButtonWithProvider />
      </HvProvider>
    </Suspense>
  );
}
