import { test, expect, Locator } from '@playwright/test';

test.describe('Home page', () => {

  let productGrid: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    productGrid = page.locator('.col-md-9');
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