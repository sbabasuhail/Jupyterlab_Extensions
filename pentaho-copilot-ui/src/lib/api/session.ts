import { toBase64 } from "lib/utils/utils";

const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/api/v1/sessions"
) as unknown as string;

export const deleteHistory = (username: string, sessionId: string) =>
  fetch(`${baseUrl}/${sessionId}`, {
    method: "delete",
    headers: {
      userType: "ui",
      "Content-Type": "application/json",
      Authorization: `${toBase64({
        username: username
      })}=`
    }
  }).then((res) => res.json().catch((err) => console.log(err)));
