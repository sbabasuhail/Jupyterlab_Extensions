import {
  HvButton,
  HvCheckBox,
  HvLoading,
  HvTypography,
  setId
} from "@hitachivantara/uikit-react-core";
import styles from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { convertUnits } from "lib/utils/utils";
import { deleteFile, useFiles } from "lib/api/files";
import { Close } from "@hitachivantara/uikit-react-icons";
import { useChatContext } from "providers/ChatContext";

const Files = () => {
  const classes = styles;
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<any[]>([]);
  const [loadFiles, setLoadFiles] = useState<boolean>(true);

  const { username, sessionId, selectedFiles, setSelectedFiles } =
    useChatContext();

  useEffect(() => {
    useFiles(username, sessionId).then((res) => {
      setFiles(res);
      let selected: string[] = [];
      if (!selectedFiles.length) {
        res.map((file: { fileName: any }) => selected.push(file.fileName));
        setSelectedFiles([...selected]);
      }
      setLoading(false);
      setLoadFiles(false);
    });
  }, [loadFiles]);

  const deleteFiles = async (file: any) => {
    const request: FileDeleteModel = {
      filename: file.fileName
    };

    await deleteFile(request, username, sessionId).then((res) => {
      setLoadFiles(true);
      console.log(res);
    });
  };

  const checkFileSelection = (
    event: ChangeEvent,
    selected: boolean,
    status: string,
    file: any
  ) => {
    if (selected) {
      setSelectedFiles([file.fileName, ...selectedFiles]);
    } else {
      const start = selectedFiles.findIndex((el) => el === file.fileName);
      selectedFiles.splice(start, 1);
      setSelectedFiles([...selectedFiles]);
    }
  };

  return (
    <ul className={classes.list}>
      {loading && <HvLoading />}
      {files?.map((file: any, index: number) => (
        <li className={classes.listItem} key={index}>
          {loading && <HvLoading className={classes.icon} />}
          {!loading && (
            <HvCheckBox
              defaultChecked={selectedFiles.find((el) => el === file.fileName)}
              onChange={(event, data, index) =>
                checkFileSelection(event, data, status, file)
              }
              className={classes.icon}
            />
          )}
          <HvTypography className={classes.nameText} variant="label">
            {file.fileName}
          </HvTypography>
          <span className={classes.progressTextContainer}>
            {file.progress || file.fileSize || file.errorMessage
              ? `\xa0|\xa0`
              : null}
            <HvTypography>{`${convertUnits(file.fileSize)}`}</HvTypography>
          </span>
          {file.preview && (
            <div className={classes.previewContainer}>{file.preview}</div>
          )}
          <HvButton
            id={setId(index, "remove-button")}
            aria-label={`Remove file ${file.fileName}`}
            className={classes.removeButton}
            onClick={() => deleteFiles(file)}
            icon
          >
            <Close iconSize="XS" />
          </HvButton>
        </li>
      ))}
    </ul>
  );
};

export default Files;
