import { mkdirSync } from "fs";
import { resolve } from "path";
import { test as setup, expect } from "@playwright/test";

setup("Create customer 01 auth", async ({ page, context }) => {
  const email = 'customer@practicesoftwaretesting.com';
  const password = 'welcome01';

  const authDir = resolve(__dirname, "..", "auth");
  mkdirSync(authDir, { recursive: true });

  const customer01AuthFile = resolve(authDir, "customer01.json");

  await page.goto('/auth/login');

  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  await context.storageState({ path: customer01AuthFile });
});