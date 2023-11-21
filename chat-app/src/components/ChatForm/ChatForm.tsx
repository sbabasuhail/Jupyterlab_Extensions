import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";

import {
  HvButton,
  HvFormStatus,
  HvTextArea,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";
import { Submit } from "@hitachivantara/uikit-react-icons";

import { useChatHistory } from "providers/ChatHistory";
import { useChatContext } from "providers/ChatContext";
import { fetcherChat } from "lib/api/chat";

import classes from "./styles";

const initialValues: ChatFormData = {
  message: "",
};

const ChatForm = () => {
  const { t } = useTranslation("chatbot");

  const { setLoading } = useChatContext();
  const { addChat } = useChatHistory();

  const [textValue, setTextValue] = useState("");

  /**
   * The validation schema used by Formik to validate the data inserted by the user.
   */
  const validationSchema = useMemo(
    () =>
      yup.object({
        message: yup.string(),
      }),
    []
  );

  /**
   * Handler for the submission of the form.
   *
   * @param {Object} data - the data inserted on the form.
   */
  const onSubmit = async (
    values: ChatFormData,
    helpers: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: (arg0: { message: string }) => void;
    }
  ) => {
    setTextValue("");

    addChat({
      type: "human",
      message: values.message,
    });

    setLoading(true);

    await fetcherChat(values.message)
      .then((aiMessage) => {
        if (aiMessage) {
          addChat({
            type: "ai",
            message: aiMessage,
          });
        }

        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally();

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const {
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
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
            },
          };
        };

        return (
          <form onSubmit={handleSubmit}>
            <div className={classes.buttonSection}>
              <div className={classes.buttons}>
                <HvTooltip placement="top" title={t("form.submit")}>
                  <HvButton
                    aria-label={t("form.submit")}
                    icon
                    variant="secondaryGhost"
                    type="submit"
                  >
                    <Submit iconSize="S" />
                  </HvButton>
                </HvTooltip>
              </div>
            </div>
            <div>
              <HvTextArea
                placeholder={t("form.placeholder") as string}
                className={classes.textbox}
                rows={3}
                value={textValue}
                resizable
                onKeyDownCapture={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
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
