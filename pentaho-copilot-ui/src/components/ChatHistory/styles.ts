import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  list: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    margin: 0,
    padding: 0,
    marginTop: theme.space.sm,
    listStyle: "none"
  }),
  listItem: css({
    position: "relative",
    display: "flex",
    padding: theme.space.xs,
    background: theme.colors.atmo2,
    cursor: "pointer",
    "&:hover": {
      background: theme.colors.neutral_20
    }
  }),
  nameText: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    paddingLeft: theme.space.sm,
    margin: "auto 0"
  }),
  buttons: css({
    textAlign: "end",
    marginLeft: "auto"
  }),
  time: css({
    textAlign: "left"
  })
};

export default styles;
