import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  root: css({
    padding: 0,
    maxHeight: "inherit",
    width: "600px",
    boxShadow: "0px 2px 12px #4141411F",
    overflow: "auto",
    transition: "all 0.3s ease-out"
  }),
  rootFullScreen: css({
    width: "70vw",
    zIndex: 2,
    opacity: 1,
    margin: "auto",
    boxShadow: "0px 2px 12px #4141411F",
    overflow: "auto"
  }),
  grid: css({
    gridTemplateRows: "1fr auto 1fr 1fr",
    padding: theme.space.sm,
    gap: "0"
  }),
  headerSection: css({
    margin: `${theme.space.xs} 0`,
    paddingBottom: theme.space.xs
  }),
  listButton: css({
    textAlign: "start",
    display: "inline-flex",
    float: "left"
  }),
  title: css({
    display: "inline-flex",
    float: "left",
    textAlign: "start",
    margin: "auto 0",
    paddingLeft: theme.space.sm,
    maxWidth: "380px"
  }),
  buttons: css({
    display: "inline-flex",
    float: "right",
    textAlign: "end",
    marginLeft: "auto"
  }),
  chatBox: css({
    height: "50vh",
    overflowY: "scroll",
    overflowX: "hidden",
    "@media(min-height:500px) and (max-height:850px)": {
      height: "30vh"
    }
  }),
  chatBoxFullScreen: css({
    height: "calc(100vh - 400px)",
    overflowY: "scroll",
    overflowX: "hidden"
  }),
  footer: css({
    textAlign: "right"
  })
};

export default styles;
