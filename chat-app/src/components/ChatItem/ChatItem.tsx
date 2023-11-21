import {
  HvTypography,
  HvAvatar,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import { Dislike, Like, Save, Share } from "@hitachivantara/uikit-react-icons";

import classes from "./styles";

const baseUrl = import.meta.resolve?.("@hv-apps/chat-app/") as string;

const ChatItem = ({ name, message, type }: ChatModel) => {
  return (
    <>
      <div
        className={
          type === "ai" ? classes.aiBackground : classes.userBackground
        }
      >
        <div className={classes.chatItem}>
          <div className={classes.chatLabel}>
            <HvAvatar
              size="xs"
              alt={name}
              src={`${baseUrl}avatar/${name}.png`}
              backgroundColor={type === "ai" ? "sema12" : "sema15"}
            >
              {
                // only name initials are shown if no image is provided
                name.split(" ").map((n) => n[0])
              }
            </HvAvatar>
            <HvTypography variant="label">{name}</HvTypography>
            {type === "ai" ? (
              <div className={classes.buttons}>
                <HvButton
                  icon
                  onClick={() => {
                    /* noop */
                  }}
                  variant="secondaryGhost"
                >
                  <Save iconSize="S" />
                </HvButton>
                <HvButton
                  icon
                  onClick={() => {
                    /* noop */
                  }}
                  variant="secondaryGhost"
                >
                  <Share iconSize="S" />
                </HvButton>
                <HvButton
                  icon
                  onClick={() => {
                    /* noop */
                  }}
                  variant="secondaryGhost"
                >
                  <Like iconSize="S" />
                </HvButton>
                <HvButton
                  icon
                  onClick={() => {
                    /* noop */
                  }}
                  variant="secondaryGhost"
                >
                  <Dislike iconSize="S" />
                </HvButton>
              </div>
            ) : null}
          </div>
          <div className={classes.chatMessage}>
            <HvTypography variant="body">{message}</HvTypography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
