import {
  HvLoading,
  HvTypography,
  HvAvatar,
  HvButton
} from "@hitachivantara/uikit-react-core";
import styles from "./styles";
import { useEffect, useState } from "react";
import { useAllHistory } from "lib/api/chat";
import { useChatContext } from "providers/ChatContext";
import { Edit, Delete } from "@hitachivantara/uikit-react-icons";
import { deleteHistory } from "lib/api/session";
import { getRelativeTimeString } from "lib/utils/utils";
import { groupBy } from "lodash";

const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/"
) as unknown as string;

const ChatHistory = () => {
  const classes = styles;
  const [sessions, setSessions] = useState<Object>({});
  const [loadSessions, setLoadSessions] = useState<boolean>(true);

  const {
    username,
    selectedCompanion,
    loading,
    setLoading,
    setHistory,
    setTabId,
    setTitle,
    setSessionId,
    setSelectedFiles
  } = useChatContext();

  useEffect(() => {
    if (loadSessions) {
      setLoading(true);
      useAllHistory(username).then((res) => {
        const sessionsList = res.map((el: any) => ({
          ...el,
          time: getRelativeTimeString(
            new Date(`${el.history[el.history?.length - 1].timestamp} GMT`)
          )
        }));
        const groupByTime = groupBy(sessionsList, "time");
        setSessions(groupByTime);
        setLoading(false);
        setLoadSessions(false);
      });
    }
  }, [loadSessions]);

  const selectThread = (session: any) => {
    setHistory(false);
    setTabId(0);
    setSessionId(session.sessionId);
    setSelectedFiles([]);
    setTitle(session.history[0]?.content);
  };

  const deleteThread = async (session: any) => {
    await deleteHistory(username, session.sessionId).then((res) => {
      setLoadSessions(true);
    });
  };

  return (
    <>
      <ul className={classes.list}>
        {loading && <HvLoading />}

        {Object.keys(sessions).map((time: string, index: number) => (
          <>
            <HvTypography variant="label" key={time} className={classes.time}>
              {time}
            </HvTypography>
            {Object.values(sessions)[index].map((session: any) => (
              <li
                className={classes.listItem}
                key={session.sessionId}
                onClick={() => selectThread(session)}
              >
                <HvAvatar
                  size="xs"
                  alt={session.type}
                  src={
                    session.type === "ai"
                      ? `${baseUrl}images/${selectedCompanion}.png`
                      : `${baseUrl}images/${username}.png`
                  }
                ></HvAvatar>
                <HvTypography className={classes.nameText} variant="caption1">
                  {session.history[0]?.content}
                </HvTypography>
                <div className={classes.buttons}>
                  <HvButton
                    aria-label={`Edit title ${session.history[0]?.content}`}
                    onClick={() => {}}
                    icon
                  >
                    <Edit iconSize="S" />
                  </HvButton>
                  <HvButton
                    aria-label={`Delete thread ${session.history[0]?.content}`}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      deleteThread(session);
                    }}
                    icon
                  >
                    <Delete iconSize="S" />
                  </HvButton>
                </div>
              </li>
            ))}
          </>
        ))}
      </ul>
    </>
  );
};

export default ChatHistory;
