import { resolve } from "path";
import { test, expect, Locator } from '@playwright/test';

test.describe('Home page with no auth', () => {

  let productGrid: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    productGrid = page.locator('.col-md-9');
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page-no-auth.png', {
      mask: [ page.getByTitle("Practice Software Testing - Toolshop") ]
    });
  });

  test("check sign in", async ({ page }) => {
    // Ensure the sign-in link is present
    await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
  });

  test("validate page title", async ({ page }) => {
    // Check the title of the page
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
  });

  test("grid loads with 9 items", async ({ page }) => {
    // Check the count of items displayed
    await productGrid.getByRole('link').first().waitFor({ state: 'visible' });
    await expect(productGrid.getByRole('link')).toHaveCount(9);
  });

  test("search for Thor Hammer", async ({ page }) => {
    // Search for Thor Hammer and check that the result is one, have search text and visible
    await page.getByTestId('search-query').fill('Thor Hammer');
    await page.getByTestId('search-submit').click();
    await productGrid.getByRole('link').first().waitFor({ state: 'visible' });
    await expect(productGrid.getByRole('link')).toHaveCount(1);

    const searchResult = await productGrid.getByRole('link').first();
    await expect(searchResult).toBeVisible();
    await expect(searchResult).toHaveText(/Thor Hammer/);
  });
});

test.describe('Home page customer 01 auth', () => {

  const authDir = resolve(__dirname, "..", "auth");
  const customer01AuthFile = resolve(authDir, "customer01.json");

  test.use({ storageState: customer01AuthFile });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("visual test auth", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page-customer01.png', {
      mask: [ page.getByTitle("Practice Software Testing - Toolshop") ]
    });
  });

  test("check customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  });

});