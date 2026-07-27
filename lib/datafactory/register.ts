import { request, expect } from "@playwright/test";

export async function registerUser(email: string, password: string) {
  const apiUrl = process.env.API_URL;
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(`${apiUrl}/users/register`, {
    data: {
      first_name: "Test",
      last_name: "User",
      dob: "1990-01-01",
      phone: "1234567890",
      email: email,
      password: password,
      address: {
        street: "Jose",
        city: "Benalmadena",
        state: "Malaga",
        country: "ES",
        postal_code: "54321",
      },
    },
  });
  expect(response.status()).toBe(201);

  return response.status();
}
