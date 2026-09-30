import { test, expect } from "@playwright/test";

test("admin login works", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.selectOption("select", "admin@salon.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/admin\/dashboard/);
});

test("customer login works", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.selectOption("select", "alex@example.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/customer\/dashboard/);
});

test("barber login works", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.selectOption("select", "marcus@salon.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/barber\/dashboard/);
});

test("receptionist login works", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.selectOption("select", "emily@salon.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/receptionist\/dashboard/);
});

test("wrong password shows error", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.fill('input[type="email"]', "admin@salon.com");
  await page.fill('input[type="password"]', "wrongpassword123");
  await page.click('button[type="submit"]');
  await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
});

test("login page has user dropdown", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  const dropdown = page.locator("select");
  await expect(dropdown).toBeVisible();
  const options = await dropdown.locator("option").all();
  expect(options.length).toBeGreaterThan(1);
});
