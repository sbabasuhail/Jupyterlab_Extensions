import {
  HvFileData,
  HvFile,
  HvTypography,
  HvButton,
  HvFileClasses,
  setId,
  HvLoading,
  HvCheckBox,
  HvFileUploaderPreview
} from "@hitachivantara/uikit-react-core";
import styles from "./styles";
import { Success, Fail, Close, Doc } from "@hitachivantara/uikit-react-icons";
import { convertUnits } from "lib/utils/utils";
import { deleteFile } from "lib/api/files";
import { useChatContext } from "providers/ChatContext";

export const getProgressText = (data: HvFileData, classes?: HvFileClasses) => {
  const hasFailed = data.status === "fail";
  const inProgress = data.status === "progress";

  return (
    <>
      {data.progress || data.size || data.errorMessage ? `\xa0|\xa0` : null}

      {inProgress && data.progress != null && (
        <HvTypography variant="label">
          {`${convertUnits(data.progress)}\xa0/\xa0`}
        </HvTypography>
      )}

      {!hasFailed && data.size && (
        <HvTypography>{`${convertUnits(data.size)}`}</HvTypography>
      )}

      {hasFailed && data.errorMessage && (
        <HvTypography className={classes?.fail}>
          {data.errorMessage}
        </HvTypography>
      )}
    </>
  );
};

const FilesList = ({ fileList, setFileList, loading }: FileListModel) => {
  const classes = styles;

  const { username, sessionId } = useChatContext();

  const getStatusIcon = (
    classes?: HvFileClasses,
    status?: HvFileData["status"]
  ) => {
    switch (status) {
      case "success":
        return <Success className={classes?.icon} color="positive" />;
      case "fail":
        return <Fail className={classes?.icon} color="negative" />;
      default:
        return <div className={classes?.icon} />;
    }
  };

  const getProgressBarWith = ({ size, progress }: HvFileData) => {
    const width =
      progress != null && size != null
        ? Math.round((progress * 100) / size)
        : 0;

    return width;
  };

  const deleteFiles = async (file: any) => {
    const request: FileDeleteModel = {
      filename: file.name
    };
    await deleteFile(request, username, sessionId).then((res) => {
      const filteredList = fileList.filter((item) => item !== file);
      setFileList?.([...filteredList]);
    });
  };

  return (
    <ul className={classes.list}>
      {fileList.length
        ? fileList.map((data: HvFileData, index: number) => (
            <li className={classes.listItem} key={index}>
              {!(data.status === "fail") && data.status === "progress" && (
                <span className={classes.progressbarBack} />
              )}

              {!(data.status === "fail") && data.status === "progress" && (
                <progress
                  className={classes.progressbar}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={getProgressBarWith(data)}
                  style={{ width: `${getProgressBarWith(data)}%` }}
                />
              )}

              {loading && <HvLoading className={classes.icon} />}

              {!loading && getStatusIcon(classes, data.status)}

              <HvTypography className={classes.nameText} variant="label">
                {data.name}
              </HvTypography>

              <span className={classes.progressTextContainer}>
                {getProgressText(data, classes)}
              </span>

              {/* {data.preview && ( */}
              {/* <div className={classes.previewContainer}><HvFileUploaderPreview aria-label="Open preview of the document (not!)"><Doc/></HvFileUploaderPreview></div> */}
              {/* )} */}

              <HvButton
                id={setId(index, "remove-button")}
                aria-label={`Remove file ${data.name}`}
                className={classes.removeButton}
                onClick={() => deleteFiles(data)}
                icon
              >
                <Close iconSize="XS" />
              </HvButton>
            </li>
          ))
        : null}
    </ul>
  );
};

export default FilesList;
