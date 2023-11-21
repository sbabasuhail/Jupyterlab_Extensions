import { withProvider } from "providers/Provider";
import { ChatContextProvider } from "providers/ChatContext";

const Chat: React.FC = () => {
  return (
    <ChatContextProvider>
      <h1></h1>
    </ChatContextProvider>
  );
};

export default withProvider(Chat);
