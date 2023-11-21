import { toBase64 } from "lib/utils/utils";

const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/api/v1/embeddings"
) as unknown as string;

export const fetcherFile = (
  data: FormData,
  username: string,
  sessionId: string
) =>
  fetch(`${baseUrl}`, {
    method: "post",
    body: data,
    headers: {
      userType: "ui",
      Authorization: `${toBase64({
        username: username
      })}=`,
      sessionId: sessionId
    }
  }).then((res) => res.json().catch((err) => console.log(err)));

export const useFiles = (username: string, sessionId: string) =>
  fetch(`${baseUrl}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      userType: "ui",
      Authorization: `${toBase64({
        username: username
      })}=`,
      sessionId: sessionId
    }
  }).then((res) => res.json().catch((err) => console.log(err)));

export const deleteFile = (
  data: FileDeleteModel,
  username: string,
  sessionId: string
) =>
  fetch(`${baseUrl}?filename=${data.filename}`, {
    method: "delete",
    body: "",
    headers: {
      userType: "ui",
      Authorization: `${toBase64({
        username: username
      })}=`,
      sessionId: sessionId
    }
  }).then((res) => res.json().catch((err) => console.log(err)));
