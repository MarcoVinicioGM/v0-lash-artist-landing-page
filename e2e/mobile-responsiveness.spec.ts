import { test, expect } from "./fixtures/test-fixtures";

test.describe("Mobile Responsiveness", () => {
  test.describe("Navigation", () => {
    test("should show hamburger menu on mobile", async ({ page }) => {
      await page.goto("/");

      const hamburger = page.getByRole("button", { name: /menu|toggle/i });
      await expect(hamburger).toBeVisible();
    });

    test("should open mobile menu when hamburger is clicked", async ({ page }) => {
      await page.goto("/");

      const hamburger = page.getByRole("button", { name: /menu|toggle/i });
      await hamburger.click();

      await expect(
        page.getByRole("navigation").getByRole("link", { name: /services/i })
      ).toBeVisible();
    });

    test("should close menu when link is clicked", async ({ page }) => {
      await page.goto("/");

      const hamburger = page.getByRole("button", { name: /menu|toggle/i });
      await hamburger.click();

      await page.getByRole("link", { name: /services/i }).click();
      await page.waitForURL(/.*services.*/);
    });

    test("should have touch-friendly navigation targets", async ({ page }) => {
      await page.goto("/");

      const hamburger = page.getByRole("button", { name: /menu|toggle/i });
      await hamburger.click();

      const navLinks = page.getByRole("navigation").getByRole("link");

      for (const link of await navLinks.all()) {
        const box = await link.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });

  test.describe("Layout", () => {
    test("should display hero content correctly on mobile", async ({ page }) => {
      await page.goto("/");

      const hero = page.locator("section").first();
      await expect(hero).toBeVisible();

      const ctaButton = page.getByRole("link", { name: /book|schedule/i }).first();
      if (await ctaButton.isVisible()) {
        const box = await ctaButton.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });

    test("should not have horizontal scroll on mobile", async ({ page }) => {
      await page.goto("/");

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });

    test("should display service cards in single column on mobile", async ({ page }) => {
      await page.goto("/services");

      const serviceCards = await page.locator(".group").all();

      if (serviceCards.length > 1) {
        const firstCard = serviceCards[0];
        const secondCard = serviceCards[1];

        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();

        if (firstBox && secondBox) {
          expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10);
        }
      }
    });
  });
});
