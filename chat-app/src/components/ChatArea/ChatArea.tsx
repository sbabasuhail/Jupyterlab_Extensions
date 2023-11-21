import { useEffect, useRef } from "react";

import { HvLoading } from "@hitachivantara/uikit-react-core";

import { useChatContext } from "providers/ChatContext";
import { useChatHistory } from "providers/ChatHistory";
import ChatItem from "components/ChatItem";

const ChatArea = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { loading } = useChatContext();
  const { chatList } = useChatHistory();

  const firstRender = useRef(true);
  useEffect(() => {
    const smoothScroll = !firstRender.current;
    firstRender.current = false;

    if (chatList.length) {
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: smoothScroll ? "smooth" : "instant",
          block: "end",
        });
      }, 1);
    }
  }, [chatList.length]);

  return (
    <>
      {chatList.length !== 0 &&
        chatList.map((chatItem) => (
          <ChatItem
            name={chatItem.name}
            type={chatItem.type}
            message={chatItem.message}
            id={chatItem.id}
            key={chatItem.id}
          ></ChatItem>
        ))}
      {loading && <HvLoading />}
      <div ref={ref} />
    </>
  );
};

export default ChatArea;
