import React, { useMemo, useState } from "react";
import { ChatHistoryProvider } from "./ChatHistory";

interface ChatContextType {
  username: string;
  selectedSentinel: { name: string };
  loading: boolean;
  setLoading: (val: boolean) => void;
}

export const ChatContext = React.createContext<ChatContextType>({
  username: "User",
  selectedSentinel: { name: "Chat Bot" },
  loading: false,
  setLoading: () => ({}),
});

interface ChatContextProviderProps {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const username = "User";
  const selectedSentinel = { name: "Chat Bot" };

  const [loading, setLoading] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      username,
      selectedSentinel,
      loading,
      setLoading,
    }),
    [username, selectedSentinel, loading, setLoading]
  );

  return (
    <ChatContext.Provider value={value}>
      <ChatHistoryProvider>{children}</ChatHistoryProvider>
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
