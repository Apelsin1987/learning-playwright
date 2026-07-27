import { test, expect } from "@playwright/test";
import { LoginPage } from "../lib/pages/login.page";
import { registerUser } from "../lib/datafactory/register";

test("login customer 01", async ({ page }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("login with newly registered user", async ({ page }) => {
  const email = `test${Date.now()}@test.com`;
  const password = "testLearning@1990!";

  await registerUser(email, password);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Test User");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});
