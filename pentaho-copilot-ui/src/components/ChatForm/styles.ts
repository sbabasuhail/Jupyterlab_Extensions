import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column"
  }),
  buttons: css({
    textAlign: "end",
    margin: "auto",
    "& button": {
      paddingLeft: theme.spacing("s"),
      paddingRight: theme.spacing("s")
    }
  }),
  button: css({
    paddingLeft: theme.spacing("s"),
    paddingRight: theme.spacing("s")
  }),
  textbox: css({
    width: "fill-available",
    "& div": {
      width: "fill-available"
    }
  })
};

export default styles;
