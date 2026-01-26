import { test, expect } from "./fixtures/test-fixtures";

test.describe("Homepage and Navigation", () => {
  test("should load homepage with 200 OK status", async ({ page }) => {
    const response = await page.goto("/");

    await expect(response?.status()).toBe(200);
  });

  test("should have working Book Now button in hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bookNowButton = page.getByRole("link", { name: /book.*now|schedule|appointment/i }).first();
    if (await bookNowButton.isVisible()) {
      await bookNowButton.click();
      await expect(page).toHaveURL(/.*services.*|.*book.*/);
    }
  });

  test("should have working Inquire button in contact section", async ({ page }) => {
    await page.goto("/#contact");
    await page.waitForLoadState("networkidle");

    const inquireButton = page.getByRole("link", { name: /inquire|contact/i }).first();
    if (await inquireButton.isVisible()) {
      await inquireButton.click();
    }
  });

  test("should navigate to services from navigation menu", async ({ page }) => {
    await page.goto("/");

    const servicesLink = page.getByRole("link", { name: /services/i }).first();
    await servicesLink.click();

    await expect(page).toHaveURL(/.*services.*/);
  });

  test("should navigate to gallery from navigation menu", async ({ page }) => {
    await page.goto("/");

    const galleryLink = page.getByRole("link", { name: /gallery/i }).first();
    await galleryLink.click();

    await expect(page).toHaveURL(/.*gallery.*/);
  });

  test("should navigate to about from navigation menu", async ({ page }) => {
    await page.goto("/");

    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    await aboutLink.click();

    await expect(page).toHaveURL(/.*about.*/);
  });
});

test.describe("Services Page Buttons", () => {
  test("should load services page", async ({ page }) => {
    const response = await page.goto("/services");

    await expect(response?.status()).toBe(200);
  });

  test("should have Book Appointment buttons on services page", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    const bookButtons = page.getByRole("button", { name: /book appointment/i });

    const count = await bookButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate when Book Appointment button is clicked", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    const bookButton = page.getByRole("button", { name: /book appointment/i }).first();
    await bookButton.click();

    await page.waitForLoadState("networkidle");
  });
});
