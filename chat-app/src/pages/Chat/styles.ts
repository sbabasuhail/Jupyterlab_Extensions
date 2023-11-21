import { theme } from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const styles = {
  root: css({
    float: "right",
    marginRight: "-36px",
    width: "575px",
    boxShadow: "0px 2px 12px #4141411F",
    overflowX: "hidden"
  }),
  rootFullScreen: css({
    width: "55vw",
    zIndex: 2,
    opacity: 1,
    margin: "auto",
    boxShadow: "0px 2px 12px #4141411F",
    overflowX: "hidden"
  }),
  section: css({
    marginTop: "-32px"
  }),
  buttons: css({
    textAlign: "end",
    margin: "auto"
  }),
  chatBox: css({
    height: "450px",
    overflowY: "scroll",
    overflowX: "hidden"
  }),
  chatBoxFullScreen: css({
    height: "calc(100vh - 400px)",
    overflowY: "scroll",
    overflowX: "hidden"
  }),
  footer: css({
    margin: "auto",
    textAlign: "right",
    marginTop: "-32px"
  }),
  modal: css({
    position: "fixed",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.colors.atmo4,
    opacity: 0.5,
    width: "100%",
    height: "100%",
    border: "1px solid #ccc",
    transition: "all 0.3s ease-out"
  })
};

export default styles;
