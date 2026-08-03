import { resolve } from "path";
import { test, expect } from "@fixtures/base.fixture";
import { registerUser } from "@datafactory/register";
import { sendMessage } from "@datafactory/messages";

test("create and reply message with fixture", async ({
  loginPage,
  accountPage,
  messagesPage,
  context,
}) => {
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

    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(accountPage.navMenu).toContainText("Test User");

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

    await messagesPage.createMessage(subject, message);
    await messagesPage.goto();
    await messagesPage.createReply(subject, message, "That is fine!");
  });
});
