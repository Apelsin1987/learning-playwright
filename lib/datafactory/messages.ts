import { request, expect } from "@playwright/test";
import * as fs from "fs";

export async function sendMessage(
  name: string,
  subject: string,
  message: string,
  authFilePath: string,
) {
  const storageData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
  const authToken = storageData.origins[0].localStorage.find(
    (item: { name: string; value: string }) => item.name === "auth-token",
  ).value;

  const apiUrl = process.env.API_URL;
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(`${apiUrl}/messages`, {
    data: {
      name: name,
      subject: subject,
      message: message,
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  expect(response.status()).toBe(200);

  return response.status();
}
