import {
  HvTypography,
  HvAvatar,
  HvButton
} from "@hitachivantara/uikit-react-core";
import styles from "./styles";
import FilesList from "components/FilesList/FilesList";
import { Dislike, Like, Save, Share } from "@hitachivantara/uikit-react-icons";
const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/"
) as unknown as string;

const ChatItem = ({
  name,
  message,
  type,
  fileList,
  time,
  sources
}: ChatModel) => {
  const classes = styles;

  return (
    <>
      <div
        className={type === "ai" ? styles.aiBackground : styles.userBackground}
      >
        <div className={styles.chatItem}>
          <div className={styles.chatLabel}>
            <HvAvatar
              size="xs"
              alt={name}
              src={`${baseUrl}images/${name}.png`}
            ></HvAvatar>
            <HvTypography variant="label">
              {type !== "ai" ? `${name} (you)` : name}
            </HvTypography>
            {time?.length ? (
              <HvTypography variant="body" className={classes.time}>
                &nbsp;&nbsp;{time}
              </HvTypography>
            ) : null}
            {type === "ai" ? (
              <div className={classes.buttons}>
                <HvButton icon onClick={() => {}} variant="secondaryGhost">
                  <Save iconSize="S" />
                </HvButton>
                <HvButton icon onClick={() => {}} variant="secondaryGhost">
                  <Share iconSize="S" />
                </HvButton>
                <HvButton icon onClick={() => {}} variant="secondaryGhost">
                  <Like iconSize="S" />
                </HvButton>
                <HvButton icon onClick={() => {}} variant="secondaryGhost">
                  <Dislike iconSize="S" />
                </HvButton>
              </div>
            ) : null}
          </div>
          <div className={classes.chatMessage}>
            {type === "ai" ? (
              <pre className={classes.pre}>{message}</pre>
            ) : (
              <HvTypography variant="body">{message}</HvTypography>
            )}
          </div>
          <div>
            {type === "ai" && sources?.length
              ? sources.map((source, index) => (
                  <>
                    <br />
                    <HvTypography
                      key={`link${index}`}
                      variant="body"
                      link={true}
                      className={classes.sources}
                    >
                      {source}
                    </HvTypography>
                  </>
                ))
              : null}
          </div>
          {fileList?.length ? (
            <FilesList fileList={fileList}></FilesList>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChatItem;
