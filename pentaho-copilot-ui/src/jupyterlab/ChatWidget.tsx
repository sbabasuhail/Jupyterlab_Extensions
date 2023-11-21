import { HvProvider } from "@hitachivantara/uikit-react-core";

import { withProvider } from "providers/Provider";
import { ChatContextProvider } from "providers/ChatContext";
import ChatPanel from "components/ChatPanel";

interface ChatWidgetProps {
  containerId: string;
  darkMode: boolean;
  alwaysExpanded?: boolean;
  hideCloseButton?: boolean;
}

function ChatWidget({
  containerId,
  darkMode = false,
  alwaysExpanded,
  hideCloseButton,
}: ChatWidgetProps) {
  return (
    <div
      id={containerId + "_uikit"}
      style={{ display: "flex", maxHeight: "100%", minWidth: 200 }}
    >
      <HvProvider
        rootElementId={containerId + "_uikit"}
        cssBaseline="scoped"
        cssTheme="scoped"
        colorMode={darkMode ? "wicked" : "dawn"}
      >
        <ChatContextProvider>
          <ChatPanel
            alwaysExpanded={alwaysExpanded}
            hideCloseButton={hideCloseButton}
          />
        </ChatContextProvider>
      </HvProvider>
    </div>
  );
}

export default withProvider(ChatWidget);
