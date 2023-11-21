import { SyntheticEvent, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  HvTypography,
  HvPanel,
  HvBox,
  HvButton,
  HvTooltip,
  HvSimpleGrid,
  HvLink,
  HvTab,
  HvTabs
} from "@hitachivantara/uikit-react-core";
import {
  ActualSize,
  Close,
  Fullscreen,
  List
} from "@hitachivantara/uikit-react-icons";

import { v4 as uuidv4 } from "uuid";

import ChatArea from "components/ChatArea/ChatArea";
import ChatForm from "components/ChatForm/ChatForm";

import classes from "./styles";
import { cx } from "@emotion/css";
import Recommendations from "components/Recommendations";
import Files from "components/Files";
import { useChatContext } from "providers/ChatContext";
import ChatHistory from "components/ChatHistory";
import NewChat from "components/NewChat";

interface ChatPanelProps {
  onClose: () => void;
  alwaysExpanded?: boolean;
  hideCloseButton?: boolean;
}

const ChatPanel = ({ 
  onClose,
  alwaysExpanded = false,
  hideCloseButton,
 }: ChatPanelProps) => {
  const { t } = useTranslation("chatbot", {
    useSuspense: true
  });

  const {
    tabId,
    title,
    history,
    newChat,
    sessionId,
    setHistory,
    setTabId,
    setNewChat,
    setTitle,
    setSessionId
  } = useChatContext();

  const [fullScreen, setFullscreen] = useState<boolean>(alwaysExpanded);

  useEffect(() => {
    if (!sessionId.length) {
      setSessionId(uuidv4());
    }
  }, []);

  const tabChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTabId(value);
    setNewChat(false);
  };

  const maximizeHandler = () => {
    setFullscreen(!fullScreen);
  };

  const listHandler = () => {
    setHistory(!history);
    setNewChat(false);
  };

  const newChatHandler = () => {
    setTitle("New Chat");
    setNewChat(true);
    setHistory(false);
  };

  return (
    <>
      <HvPanel
        className={cx(classes.root, {
          [classes.rootFullScreen]: fullScreen
        })}
      >
        <HvSimpleGrid
          className={classes.grid}
          cols={1}
          style={{ gridTemplateRows: "auto 1fr auto" }}
        >
          <div className={classes.headerSection}>
            <div className={classes.listButton}>
              <HvButton
                aria-label={t("buttons.threads")}
                icon
                onClick={listHandler}
                variant="secondaryGhost"
              >
                <List iconSize="S" />
              </HvButton>
            </div>

            <HvTypography
              component="h4"
              variant="title4"
              className={classes.title}
            >
              {history ? t("page.threads") : title}
            </HvTypography>
            {(!hideCloseButton || !alwaysExpanded) && (
            <div className={classes.buttons}>
              {!alwaysExpanded && (
                <HvTooltip
                  placement="top"
                  disableFocusListener
                  title={
                    fullScreen ? t("buttons.minimize") : t("buttons.maximize")
                  }
                >
                  <HvButton
                  aria-label={
                    fullScreen ? t("buttons.minimize") : t("buttons.maximize")
                  }
                  icon
                  onClick={maximizeHandler}
                  variant="secondaryGhost"
                >
                  {fullScreen ? (
                    <ActualSize iconSize="S" />
                  ) : (
                    <Fullscreen iconSize="S" />
                  )}
                  </HvButton>
                </HvTooltip>
              )}
              {!hideCloseButton && (
                <HvTooltip
                  placement="top"
                  disableFocusListener
                  title={t("buttons.close")}
                >
                  <HvButton
                    aria-label={t("buttons.close")}
                    icon
                    variant="secondaryGhost"
                    onClick={onClose}
                  >
                    <Close iconSize="S" />
                  </HvButton>
                </HvTooltip>
              )}
              <HvTooltip
                  placement="top"
                  disableFocusListener
                  title={t("buttons.newChat")}
                >
              


              <HvButton
                variant="primaryGhost"
                aria-label={t("buttons.newChat")}
                onClick={newChatHandler}
              >
              </HvButton>
              </HvTooltip>
            </div>
          )}
          </div>

          {!history && !newChat && (
            <HvTabs
              onChange={(event, value) => tabChangeHandler(event, value)}
              value={tabId}
            >
              <HvTab label={t("tabs.chat")} />
              <HvTab label={t("tabs.recommendations")} />
            </HvTabs>
          )}

          <HvBox
            className={cx(classes.chatBox, {
              [classes.chatBoxFullScreen]: fullScreen
            })}
          >
            {!history && !newChat && (
              <>
                {tabId === 0 && <ChatArea />}
                {tabId === 1 && <Recommendations />}
                {tabId === 2 && <Files />}
              </>
            )}
            {history && <ChatHistory />}
            {newChat && <NewChat />}
          </HvBox>

          <ChatForm />
          <div className={classes.footer}>
            <HvTypography variant="caption1">
              {t("footer.message")}
            </HvTypography>
            <HvLink route="/">
              <HvTypography variant="caption1">{t("footer.link")}</HvTypography>
            </HvLink>
          </div>
        </HvSimpleGrid>
      </HvPanel>
    </>
  );
};

export default ChatPanel;
