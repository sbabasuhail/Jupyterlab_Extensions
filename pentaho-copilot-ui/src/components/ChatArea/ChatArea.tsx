import ChatItem from "components/ChatItem";
import { HvLoading } from "@hitachivantara/uikit-react-core";
import { useEffect, useRef } from "react";
import { useHistory } from "lib/api/chat";
import { useChatContext } from "providers/ChatContext";
import { useChatHistory } from "providers/ChatHistory";
import { useFiles } from "lib/api/files";
import { getRelativeTimeString } from "lib/utils/utils";

const ChatArea = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    username,
    selectedCompanion,
    loading,
    sessionId,
    setLoading,
    setSelectedFiles
  } = useChatContext();
  const { chatList, addChat, clearChat } = useChatHistory();

  useEffect(() => {
    clearChat();
    if (sessionId?.length) {
      setLoading(true);
      useHistory(username, sessionId).then((res) => {
        const array = res[0].history;
        array.sort(
          (
            a: { timestamp: string | number | Date },
            b: { timestamp: string | number | Date }
          ) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        array.map((el: any, i: number) =>
          addChat({
            type: el.type,
            message: el.content,
            name: selectedCompanion,
            time: getRelativeTimeString(new Date(`${el.timestamp} GMT`))
          })
        );
        setLoading(false);
      });
      useFiles(username, sessionId).then((res) => {
        let selected: string[] = [];
        res.map((file: { fileName: any }) => selected.push(file.fileName));
        setSelectedFiles([...selected]);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (chatList.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [chatList.length]);

  return (
    <>
      {chatList.length !== 0 &&
        chatList.map((chatItem) => (
          <ChatItem {...chatItem} key={`chatItem${chatItem.id}`}></ChatItem>
        ))}
      {loading && <HvLoading />}
      <div ref={ref} />
    </>
  );
};

export default ChatArea;
