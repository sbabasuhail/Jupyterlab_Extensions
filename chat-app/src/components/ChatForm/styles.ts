import { css } from "@emotion/css";

const styles = {
  buttons: css({
    textAlign: "end",
    margin: "auto",
    width: "100%",
  }),
  buttonSection: css({
    display: "flex",
    flexDirection: "row",
  }),
  textbox: css({
    width: "fill-available",
    "& div": {
      width: "fill-available",
    },
  }),
};

export default styles;
