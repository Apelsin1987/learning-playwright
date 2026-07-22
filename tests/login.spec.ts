import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  await expect(page.getByTestId('page-title')).toContainText('My account');
});