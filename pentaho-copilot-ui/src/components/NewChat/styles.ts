import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  section: css({
    border: theme.fileUploader.fileList.itemBorder,
    height: "fit-content",
    position: "relative"
  }),
  avatar: css({
    cursor: "pointer"
  }),
  mainSection: css({
    display: "flex",
    flexDirection: "row",
    padding: theme.space.xs
  }),
  otherSection: css({
    flexFlow: "row wrap"
  }),
  item: css({
    flex: "150px",
    padding: theme.space.xs,
    textOverflow: "ellipsis"
  })
};

export default styles;
