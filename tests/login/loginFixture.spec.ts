import { test, expect } from "@fixtures/base.fixture";
import { registerUser } from "@datafactory/register";

test("login with fixture", async ({ loginPage, accountPage }) => {
  const email = `test${Date.now()}@test.com`;
  const password = "testLearning@1990!";

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(accountPage.navMenu).toContainText("Test User");
  await expect(accountPage.pageTitle).toContainText("My account");
});
