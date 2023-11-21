import { withProvider } from "providers/Provider";
import { ChatContextProvider } from "providers/ChatContext";

const Chat: React.FC = () => {
  return (
    <ChatContextProvider>
      <h1>Some content</h1>
    </ChatContextProvider>
  );
};

export default withProvider(Chat);
