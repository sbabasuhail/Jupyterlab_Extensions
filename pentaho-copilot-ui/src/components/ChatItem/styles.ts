import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  chatItem: css({
    width: "100%",
    color: theme.colors.secondary,
    display: "flex",
    flexDirection: "column",
    paddindLeft: "12px",
    padding: "6px",
    margin: "6px"
  }),
  chatLabel: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }),
  chatMessage: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& p": {
      overflowX: "auto"
    }
  }),
  pre: css({
    whiteSpace: "pre-wrap",
    textAlign: "left",
    wordBreak: "break-word",
    fontFamily: "inherit",
    overflowX: "auto"
  }),
  aiBackground: css({
    background: theme.colors.atmo2
  }),
  buttons: css({
    textAlign: "end",
    marginLeft: "auto"
  }),
  userBackground: css({
    background: "none"
  }),
  time: css({
    color: theme.colors.secondary_80
  }),
  sources: css({
    textAlign: "left"
  })
};

export default styles;
