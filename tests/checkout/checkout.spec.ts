import { resolve } from "path";
import { test, expect } from "@playwright/test";
import { randomState } from "@helpers/states";

test.describe("Order checkout", () => {
  const authDir = resolve(__dirname, "../..", "auth");
  const customer01AuthFile = resolve(authDir, "customer01.json");

  test.use({ storageState: customer01AuthFile });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("buy now pay later", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await productGrid.getByRole("link").first().click();

    await expect(page.getByTestId("product-name")).toBeVisible();
    const productName = await page.getByTestId("product-name").textContent();

    await page.getByTestId("increase-quantity").click();
    await expect(page.getByTestId("quantity")).toHaveValue("2");

    await page.getByTestId("add-to-cart").click();
    await page.getByTestId("nav-cart").click();

    if (productName !== null) {
      await expect(page.getByTestId("product-title")).toHaveText(productName);
    }

    await page.getByTestId("proceed-1").click();

    await expect(page.getByTestId("proceed-2")).toBeVisible();
    await page.getByTestId("proceed-2").click();

    await page.getByTestId("state").fill(randomState());
    await page.getByTestId("postal_code").fill("12345");
    await page.getByTestId("house_number").fill("123");

    await expect(page.getByTestId("proceed-3")).toBeEnabled();
    await page.getByTestId("proceed-3").click();

    await expect(page.getByTestId("payment-method")).toBeVisible();
    await page.getByTestId("payment-method").selectOption("buy-now-pay-later");
    await expect(page.getByTestId("monthly_installments")).toBeVisible();
    await page.getByTestId("monthly_installments").selectOption("3");
    await expect(page.getByTestId("finish")).toBeEnabled();
    await page.getByTestId("finish").click();

    await expect(page.getByTestId("payment-success-message")).toBeVisible();

    await expect(page).toHaveScreenshot("order-checkout-customer01.png");
  });
});
