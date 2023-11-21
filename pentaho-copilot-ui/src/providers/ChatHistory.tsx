import React, { useCallback, useEffect, useMemo } from "react";
import { useChatContext } from "./ChatContext";
import { useRefreshSafeReducer } from "utils/useRefreshSafeState";

interface ChatAction {
  type: "add" | "clear";
  payload: Omit<ChatModel, "id"> | Omit<ChatModel, "id">[];
}

interface ChatHistoryContextType {
  chatList: ChatModel[];
  addChat: (chat: Omit<ChatModel, "id"> | Omit<ChatModel, "id">[]) => void;
  clearChat: () => void;
}

export const ChatHistoryContext = React.createContext<ChatHistoryContextType>({
  chatList: [],
  addChat: () => ({}),
  clearChat: () => ({})
});

const reducer = (state: ChatModel[], action: ChatAction) => {
  switch (action.type) {
    case "add": {
      const toAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return [
        ...state,
        ...toAdd.map<ChatModel>((item, i) => ({
          id: (state.length + i).toString(),
          ...item
        }))
      ];
    }
    case "clear":
      return [];
    default:
      return state;
  }
};

interface ChatHistoryProviderProps {
  children: React.ReactNode;
}

export const ChatHistoryProvider = ({ children }: ChatHistoryProviderProps) => {
  const [chatList, dispatch] = useRefreshSafeReducer(
    "uikit-assistant-chat-history",
    reducer,
    []
  );

  const { username } = useChatContext();

  const addChat = useCallback(
    (chat: Omit<ChatModel, "id"> | Omit<ChatModel, "id">[]) => {
      const toAdd = (Array.isArray(chat) ? chat : [chat]).map<
        Omit<ChatModel, "id">
      >((chatItem) => {
        return {
          ...chatItem,
          name: chatItem.type === "human" ? username : chatItem.name
        };
      });
      dispatch({ type: "add", payload: toAdd });
    },
    [dispatch]
  );

  const clearChat = useCallback(() => {
    dispatch({ type: "clear", payload: [] });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      chatList,
      addChat,
      clearChat
    }),
    [chatList, addChat, clearChat]
  );

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  return React.useContext(ChatHistoryContext);
};
