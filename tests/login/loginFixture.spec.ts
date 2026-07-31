import { test, expect } from "@fixtures/pages.fixtures";
import { registerUser } from "@datafactory/register";

test("login with fixture", async ({ page, loginPage }) => {
  const email = `test${Date.now()}@test.com`;
  const password = "testLearning@1990!";

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Test User");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});
