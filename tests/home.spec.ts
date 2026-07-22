import { test, expect } from '@playwright/test';

test("Home page", async ({ page }) => {
  await page.goto("/");

  // Ensure the sign-in link is present
  await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');

  // Check the title of the page
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');

  // Check the count of items displayed
  const productGrid = await page.locator('.col-md-9');
  await expect(productGrid.getByRole('link')).toHaveCount(9);

  // Search for Thor Hammer and check that the result is one, have search text and visible
  await page.getByTestId('search-query').fill('Thor Hammer');
  await page.getByTestId('search-submit').click();
  await expect(productGrid.getByRole('link')).toHaveCount(1);

  const searchResult = await productGrid.getByRole('link').first();
  await expect(searchResult).toBeVisible();
  await expect(searchResult).toHaveText(/Thor Hammer/);
});