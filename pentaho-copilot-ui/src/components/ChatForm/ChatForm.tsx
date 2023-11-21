import { useTranslation } from "react-i18next";
import styles from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import * as yup from "yup";
import accept from "attr-accept";
import {
  HvFormStatus,
  HvTextArea,
  HvButton,
  isKey,
  HvFileData,
  HvTooltip
} from "@hitachivantara/uikit-react-core";
import { Submit, Upload } from "@hitachivantara/uikit-react-icons";
import { Formik } from "formik";
import { fetcherChat } from "lib/api/chat";
import FilesList from "components/FilesList/FilesList";
import { fetcherFile, useFiles } from "lib/api/files";
import { useChatContext } from "providers/ChatContext";
import { useChatHistory } from "providers/ChatHistory";

const initialValues: ChatFormData = {
  message: ""
};

const ChatForm = () => {
  const { t } = useTranslation("chatbot", {
    useSuspense: true
  });

  const {
    sessionId,
    username,
    selectedCompanion,
    selectedFiles,
    setSessionId,
    setLoading,
    setSelectedFiles
  } = useChatContext();
  const { addChat } = useChatHistory();

  const [textValue, setTextValue] = useState("");
  const classes = styles;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loadFiles, setLoadFiles] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<HvFileData[]>([]);
  const acceptedFiles: string[] = [".txt", ".csv", ".pdf", ".html"];
  const maxFileSize = 1048576;

  useEffect(() => {
    if (loadFiles) {
      setLoading(true);
      useFiles(username, sessionId).then((res) => {
        let selected: string[] = [];
        res.map((file: { fileName: any }) => selected.push(file.fileName));
        setSelectedFiles([...selected]);
        setLoading(false);
        setLoadFiles(false);
      });
    }
  }, [loadFiles]);

  /**
   * The validation schema used by Formik to validate the data inserted by the user.
   */
  const validationSchema = useMemo(
    () =>
      yup.object({
        message: yup.string()
      }),

    []
  );

  const fileUploadHandler = async (filesList: FileList) => {
    //@ts-ignore
    const filesToProcess = Object.keys(filesList).map((e) => filesList[e]);
    const formData = new FormData();
    formData.append("file", filesToProcess[0]);

    const newFiles: HvFileData[] = [];
    filesToProcess.forEach((file: File, index: number) => {
      const newFile: HvFileData = file;
      const isSizeAllowed = file.size <= maxFileSize;
      const isFileAccepted =
        !acceptedFiles.length ||
        acceptedFiles.indexOf(file.type.split("/")[1]) > -1 ||
        acceptedFiles.some((acceptExtension) =>
          accept({ name: file.name, type: file.type }, acceptExtension)
        );

      if (!isFileAccepted) {
        newFile.errorMessage = t("files.typeError") as string;
        newFile.status = "fail";
      } else if (!isSizeAllowed) {
        newFile.errorMessage = t("files.sizeError") as string;
        newFile.status = "fail";
      } else {
        newFile.status = "success";
        newFile.progress = 100;
      }
      newFile.id = `uploaded-file-data-${index}`;
      newFiles.push(newFile);
    });
    setFileList(newFiles);

    if (filesToProcess.length && newFiles[0].status === "success") {
      setFileLoading(true);
      await fetcherFile(formData, username, sessionId).then((res) => {
        setFileLoading(false);
        if (!res.message) {
          newFiles[0].status = "fail";
          newFiles[0].errorMessage = t("files.uploadError") as string;
        } else {
          setLoadFiles(true);
          addChat({
            type: "human",
            message: "",
            fileList: newFiles,
            name: ""
          });
          setFileList([]);
        }
      });
    }
  };
  /**
   * Handler for the submission of the form.
   *
   * @param {Object} data - the data inserted on the form.
   */
  const onSubmit = async (
    values: ChatFormData,
    helpers: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    let request: ChatRequestModel;
    if (values.message.length) {
      setSessionId(sessionId);
      request = {
        message: values.message,
        filename: [...new Set(selectedFiles)]
      };
      addChat({
        type: "human",
        message: values.message,
        name: ""
      });
      setLoading(true);
      setTextValue("".trim());
      helpers.resetForm();
      await fetcherChat(request, username, sessionId)
        .then((res: { modelResponse: any; sources: string[] }) => {
          if (res) {
            addChat({
              type: "ai",
              message: res.modelResponse || t("messages.default"),
              name: selectedCompanion,
              sources: res.sources
            });
          }
          setLoading(false);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          helpers.setSubmitting(false);
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      //@ts-ignore
      onSubmit={onSubmit}
    >
      {(props) => {
        const {
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          setSubmitting,
          resetForm
        } = props;

        const formikErrors: any = errors;
        const formikTouched: any = touched;
        // Parse the status for the field
        const parseStatus = (name: string) => {
          return formikErrors[name] && formikTouched[name]
            ? "invalid"
            : "valid";
        };

        // Get the status message for the field
        const parseStatusMessage = (name: string) => {
          return formikErrors[name] && formikTouched[name]
            ? formikErrors[name]
            : "";
        };

        // Get generic status properties for each field
        const fieldStatusProps = (id: string) => {
          return {
            status: parseStatus(id) as HvFormStatus,
            statusMessage: parseStatusMessage(id),
            onChange: (
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              value: string
            ) => {
              setFieldTouched(id);
              setTextValue(value);
              setFieldValue(id, value);
            }
          };
        };

        return (
          <form onSubmit={handleSubmit}>
            <div>
              <FilesList
                fileList={fileList}
                setFileList={setFileList}
                loading={fileLoading}
              />
            </div>
            <div className={classes.buttons}>
              <input
                type="file"
                tabIndex={-1}
                ref={inputRef}
                accept={acceptedFiles.join(",")}
                multiple={false}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                onChange={() => {
                  if (inputRef.current?.files) {
                    fileUploadHandler(inputRef.current.files);
                  }
                }}
                style={{ display: "none" }}
              ></input>
              <HvTooltip placement="top" title={t("buttons.tooltips.upload")}>
                <HvButton
                  aria-label={t("buttons.upload")}
                  icon
                  className={classes.button}
                  variant="secondaryGhost"
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload iconSize="S"></Upload>
                  {t("buttons.upload")}
                </HvButton>
              </HvTooltip>
              <HvTooltip placement="top" title={t("buttons.submit")}>
                <HvButton
                  icon
                  variant="secondaryGhost"
                  type="submit"
                  className={classes.button}
                >
                  <Submit iconSize="S" />
                  {t("buttons.submit")}
                </HvButton>
              </HvTooltip>
            </div>
            {/* </div> */}
            <div>
              <HvTextArea
                placeholder={t("form.placeholder") as string}
                className={classes.textbox}
                rows={3}
                value={textValue}
                resizable
                onKeyDownCapture={(e) => {
                  if (isKey(e, "Enter")) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                {...fieldStatusProps("message")}
              ></HvTextArea>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ChatForm;
