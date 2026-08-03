import { test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AccountPage } from "@pages/account.page";
import { MessagesPage } from "@pages/messages.page";

type Pages = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  messagesPage: MessagesPage;
};

export const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
});

export { expect } from "@playwright/test";
