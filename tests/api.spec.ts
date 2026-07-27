import { test, expect } from "@playwright/test";

const apiUrl = process.env.API_URL;

test("GET /products", async ({ request }) => {
  const response = await request.get(`${apiUrl}/products`);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.data.length).toBe(9);
  expect(responseBody.total).toBe(50);
});

test("POST /users/login", async ({ request }) => {
  const response = await request.post(`${apiUrl}/users/login`, {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
  });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.access_token).toBeTruthy();
});

test("GET first product", async ({ page, request }) => {
  const responseProducts = await request.get(`${apiUrl}/products`);
  expect(responseProducts.status()).toBe(200);

  const bodyProducts = await responseProducts.json();
  if (!bodyProducts.data || bodyProducts.data.length === 0) {
    throw new Error("No products found");
  }

  const productId = bodyProducts.data[0].id;
  const responseFirstProduct = await request.get(
    `${apiUrl}/products/${productId}`,
  );
  expect(responseFirstProduct.status()).toBe(200);

  const bodyFirstProduct = await responseFirstProduct.json();
  expect(bodyFirstProduct.id).toBe(productId);
  expect(bodyFirstProduct.price).toBeNumber();
});
