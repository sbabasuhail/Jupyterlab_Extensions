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
    margin: "6px",
  }),
  chatLabel: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  chatMessage: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  aiBackground: css({
    background: theme.colors.atmo2,
  }),
  buttons: css({
    textAlign: "end",
    marginLeft: "auto",
  }),
  userBackground: css({
    background: "none",
  }),
};

export default styles;
