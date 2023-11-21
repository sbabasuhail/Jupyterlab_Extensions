import { useState } from "react";

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
} from "@hitachivantara/uikit-react-icons";

import ChatArea from "components/ChatArea/ChatArea";
import ChatForm from "components/ChatForm/ChatForm";

import classes from "./styles";
import { cx } from "@emotion/css";

interface ChatPanelProps {
  onClose?: () => void;
  alwaysExpanded?: boolean;
  hideCloseButton?: boolean;
}

const ChatPanel = ({
  onClose,
  alwaysExpanded = false,
  hideCloseButton,
}: ChatPanelProps) => {
  const { t } = useTranslation("chatbot");

  const [fullScreen, setFullscreen] = useState<boolean>(alwaysExpanded);
  const maximizeHandler = () => {
    setFullscreen(!fullScreen);
  };

  return (
    <>
      <HvPanel
        className={cx(classes.root, {
          [classes.rootFullScreen]: fullScreen,
        })}
      >
        <HvSimpleGrid
          className={classes.grid}
          cols={1}
          style={{ gridTemplateRows: "auto 1fr auto" }}
        >
          <HvTypography component="h4" variant="title4">
            {t("title")}
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
            </div>
          )}
          <HvBox className={classes.chatBox}>
            <ChatArea />
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
