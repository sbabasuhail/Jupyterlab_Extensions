import { toBase64 } from "lib/utils/utils";

const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/api/v1/messages"
) as unknown as string;

export const fetcherChat = async (
  body: any,
  username: string,
  sessionId: string
) =>
  fetch(`${baseUrl}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      userType: "ui",
      Authorization: `${toBase64({
        username: username
      })}=`,
      sessionId: sessionId
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

export const useAllHistory = async (username: string) =>
  fetch(`${baseUrl}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      userType: "ui",
      Authorization: `${toBase64({
        username: username
      })}=`
    }
  }).then((res) => res.json());

export const useHistory = (username: string, sessionId: string) =>
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
