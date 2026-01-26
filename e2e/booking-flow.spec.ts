import { test, expect } from "./fixtures/test-fixtures";

test.describe("Homepage and Navigation", () => {
  test("should load homepage with 200 OK status", async ({ page }) => {
    const response = await page.goto("/");

    await expect(response?.status()).toBe(200);
  });

  test("should have working Book Now button in hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Book Now is now an external link to Square booking
    const bookNowButton = page.getByRole("link", { name: /book.*now/i }).first();
    
    await expect(bookNowButton).toBeVisible();
    
    // Verify it has the correct external booking link
    const href = await bookNowButton.getAttribute("href");
    expect(href).toMatch(/book\.squareup\.com|makeupbyannagarcia\.com/);
    
    // Verify it opens in a new tab
    const target = await bookNowButton.getAttribute("target");
    expect(target).toBe("_blank");
  });

test("should navigate to internal Shop page from navigation", async ({ page, isMobile }) => {
  await page.goto("/");

  // On mobile, Shop link is hidden in hamburger menu - open it first
  if (isMobile) {
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(300);
  }

  const shopLink = page.getByRole("link", { name: /shop/i }).first();
  
  await expect(shopLink).toBeVisible();

  // Shop currently links to internal /shop page (no external Squarespace yet)
  const href = await shopLink.getAttribute("href");
  expect(href).toBe("/shop");
  
  // Navigate and verify
  await shopLink.click();
  await expect(page).toHaveURL(/.*shop.*/);
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

  test("should navigate to bridal from navigation menu", async ({ page }) => {
    await page.goto("/");

    const bridalLink = page.getByRole("link", { name: /bridal/i }).first();
    await bridalLink.click();

    await expect(page).toHaveURL(/.*bridal.*/);
  });
});

test.describe("Services Page Buttons", () => {
  test("should load services page", async ({ page }) => {
    const response = await page.goto("/services");

    await expect(response?.status()).toBe(200);
  });

  test("should have Book Appointment links on services page", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    // Book Appointment uses Button with asChild, which renders as <a> link
    const bookLinks = page.getByRole("link", { name: /book appointment/i });

    const count = await bookLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have external booking links when Book Appointment is clicked", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    const bookLink = page.getByRole("link", { name: /book appointment/i }).first();
    
    // Verify it links to Square booking
    const href = await bookLink.getAttribute("href");
    expect(href).toMatch(/book\.squareup\.com|makeupbyannagarcia\.com/);
    
    // Verify it opens in a new tab
    const target = await bookLink.getAttribute("target");
    expect(target).toBe("_blank");
  });

  test("should display service cards with correct structure", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    // Verify service cards are rendered using semantic article elements
    const serviceCards = page.getByTestId("service-card");
    const count = await serviceCards.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Each card should have a heading
    const firstCard = serviceCards.first();
    await expect(firstCard.getByRole("heading")).toBeVisible();
  });
});
