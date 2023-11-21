import React, { useMemo, useState } from "react";
import { ChatHistoryProvider } from "./ChatHistory";

interface ChatContextType {
  username: string;
  selectedCompanion: string;
  setSelectedCompanion: (val: any) => void;
  tabId: number;
  setTabId: (val: number) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  sessionId: string;
  setSessionId: (val: string) => void;
  selectedFiles: any[];
  setSelectedFiles: (val: any[]) => void;
  title: string;
  setTitle: (val: string) => void;
  history: boolean;
  setHistory: (val: boolean) => void;
  newChat: boolean;
  setNewChat: (val: boolean) => void;
}

export const ChatContext = React.createContext<ChatContextType>({
  username: "David",
  selectedCompanion: "Configuration Sentinel",
  tabId: 0,
  loading: false,
  sessionId: "",
  selectedFiles: [],
  title: "New Chat",
  history: false,
  newChat: false,
  setSelectedCompanion: () => ({}),
  setLoading: () => ({}),
  setTabId: () => ({}),
  setSessionId: () => ({}),
  setSelectedFiles: () => ({}),
  setTitle: () => ({}),
  setHistory: () => ({}),
  setNewChat: () => ({})
});

interface ChatContextProviderProps {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const username = "David";
  const [selectedCompanion, setSelectedCompanion] = useState<any>(
    "Configuration Sentinel"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [tabId, setTabId] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("New Chat");
  const [history, setHistory] = useState<boolean>(false);
  const [newChat, setNewChat] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      username,
      selectedCompanion,
      setSelectedCompanion,
      loading,
      setLoading,
      tabId,
      setTabId,
      sessionId,
      setSessionId,
      selectedFiles,
      setSelectedFiles,
      title,
      setTitle,
      history,
      setHistory,
      newChat,
      setNewChat
    }),
    [
      username,
      selectedCompanion,
      setSelectedCompanion,
      loading,
      setLoading,
      tabId,
      setTabId,
      sessionId,
      setSessionId,
      selectedFiles,
      setSelectedFiles,
      title,
      setTitle,
      history,
      setHistory,
      newChat,
      setNewChat
    ]
  );

  return (
    <ChatContext.Provider value={value}>
      <ChatHistoryProvider>{children}</ChatHistoryProvider>
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
