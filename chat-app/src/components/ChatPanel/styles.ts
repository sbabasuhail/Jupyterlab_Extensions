import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  root: css({
    padding: 0,
    maxHeight: "inherit",
    width: "575px",
    boxShadow: "0px 2px 12px #4141411F",
    overflowX: "hidden",
    transition: "width 0.5s",
  }),
  grid: css({
    maxHeight: "inherit",
    gridTemplateRows: "1fr auto 1fr 1fr",
    padding: theme.space.sm,
  }),
  rootFullScreen: css({
    width: "calc( 100vw - 5px )",
    zIndex: 2,
  }),
  section: css({
    marginTop: "-32px",
  }),
  buttons: css({
    position: "absolute",
    top: theme.space.sm,
    right: theme.space.sm,
    height: "32px",
  }),
  chatBox: css({
    overflowY: "scroll",
    overflowX: "hidden",
  }),
  footer: css({
    textWrap: "balance",
    width: "100%",
    // padding: theme.spacing(0, "sm"),
    textAlign: "right",
  }),
};

export default styles;
