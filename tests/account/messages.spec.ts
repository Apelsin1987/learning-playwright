import { resolve } from "path";
import { test, expect } from "@playwright/test";
import { registerUser } from "@datafactory/register";
import { sendMessage } from "@datafactory/messages";
import { LoginPage } from "@pages/login.page";
import { MessagesPage } from "@pages/messages.page";

test("create and reply message", async ({ page, context }) => {
  const email = `messageuser${Date.now()}@test.com`;
  const password = "MessageTestLearning@1990@";
  const messageUserAuthFile = resolve(
    __dirname,
    "../..",
    "auth",
    "messageUser.json",
  );
  let subject: string;
  let message: string;

  await test.step("create a new user", async () => {
    await registerUser(email, password);

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(page.getByTestId("nav-menu")).toContainText("Test User");

    await context.storageState({ path: messageUserAuthFile });
  });

  await test.step("create a message with API", async () => {
    subject = "webmaster";
    message = `It is the message from email ${email} for check API message creating`;

    await sendMessage("Test User", subject, message, messageUserAuthFile);
  });

  await test.step("check the message and create reply", async () => {
    subject = "customer-service";
    message = `My email is: ${email}. My password is: ${password}. If you want to login with my email and password, you can. No problem!`;

    const messagesPage = new MessagesPage(page);
    await messagesPage.createMessage(subject, message);
    await messagesPage.goto();
    await messagesPage.createReply(subject, message, "That is fine!");
  });
});
