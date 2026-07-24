import { test, expect } from '@playwright/test';

test('GET /products', async ({ request }) => {

  const apiURL = "https://api.practicesoftwaretesting.com";
  const response = await request.get(`${apiURL}/products`);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.data.length).toBe(9);
  expect(responseBody.total).toBe(50);

});

test('POST /users/login', async ({ request }) => {

  const apiURL = "https://api.practicesoftwaretesting.com";
  const response = await request.post(`${apiURL}/users/login`, {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01"
    }
  });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.access_token).toBeTruthy();

});

test('GET first product', async ({ page, request }) => {

  const apiURL = "https://api.practicesoftwaretesting.com";

  const responseProducts = await request.get(`${apiURL}/products`);
  expect(responseProducts.status()).toBe(200);

  const bodyProducts = await responseProducts.json();
  if (!bodyProducts.data || bodyProducts.data.length === 0) {
    throw new Error("No products found");
  };

  const productId = bodyProducts.data[0].id;
  const responseFirstProduct = await request.get(`${apiURL}/products/${productId}`);
  expect(responseFirstProduct.status()).toBe(200);

  const bodyFirstProduct = await responseFirstProduct.json();
  expect(bodyFirstProduct.id).toBe(productId);

});