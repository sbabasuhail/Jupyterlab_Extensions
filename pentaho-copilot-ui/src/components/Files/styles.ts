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
    alignItems: "center",
    background: theme.colors.atmo1,
    padding: `${theme.space.xs} 0px`,
    border: theme.fileUploader.fileList.itemBorder,
    borderRadius: theme.fileUploader.fileList.itemBorderRadius
  }),
  progressbar: css({
    position: "absolute",
    top: "-1px",
    width: "80%",
    height: theme.fileUploader.file.progressHeight,
    border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.secondary}`,

    "&::-moz-progress-bar": css({
      background: theme.colors.secondary
    })
  }),
  progressbarBack: css({
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.atmo4}`
  }),
  nameText: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }),
  progressTextContainer: css({
    display: "flex",
    flexGrow: 1,
    alignItems: "center"
  }),
  removeButton: css({
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`
  }),
  previewContainer: css({
    display: "flex",
    margin: `0px ${theme.space.xs}`,
    width: theme.fileUploader.file.previewContainerSize,
    height: theme.fileUploader.file.previewContainerSize,
    justifyContent: "center",
    alignItems: "center",

    "& span": css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    }),

    "& img": css({
      width: theme.fileUploader.file.imageSize,
      height: theme.fileUploader.file.imageSize,
      objectFit: "cover",
      objectPosition: "center",
      alignSelf: "center"
    })
  }),
  icon: css({
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`
  }),
  fail: css({})
};

export default styles;
