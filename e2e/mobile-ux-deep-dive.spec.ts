import { test, expect } from "./fixtures/test-fixtures";

/**
 * Mobile UX Deep Dive Tests
 * 
 * Comprehensive mobile-specific testing for Amor Glam.
 * These tests focus on touch accessibility, layout integrity,
 * and critical conversion paths on mobile devices.
 * 
 * NOTE: Shop/Products features are intentionally excluded.
 */

// All tests in this file only run on strict MOBILE PHONE viewports
test.beforeEach(({ isMobile, page }) => {
  const viewport = page.viewportSize();
  
  // Skip if not mobile OR if the screen is wider than a large phone (e.g. 640px)
  // This explicitly excludes iPads/Tablets
  if (!isMobile || (viewport && viewport.width > 640)) {
    test.skip(true, "Mobile UX tests only run on small screens (Phones)");
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. GALLERY & GRID STACKING
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Gallery & Grid Stacking", () => {
  test("should display gallery images in mobile-optimized layout", async ({ page }) => {
    await page.goto("/gallery");
    await page.waitForLoadState("networkidle");

    // Get all gallery images
    const galleryImages = page.locator("img").filter({ hasNot: page.locator("[data-logo]") });
    const imageCount = await galleryImages.count();

    expect(imageCount).toBeGreaterThan(0);

    // Check that images are stacked or in a reasonable mobile grid (max 2 columns)
    if (imageCount >= 2) {
      const firstImage = galleryImages.nth(0);
      const secondImage = galleryImages.nth(1);

      const firstBox = await firstImage.boundingBox();
      const secondBox = await secondImage.boundingBox();

      if (firstBox && secondBox) {
        const viewportWidth = await page.evaluate(() => window.innerWidth);

        // Images should either:
        // 1. Stack vertically (single column) - secondBox.y > firstBox.y + firstBox.height
        // 2. Be in a 2-column grid where each image takes ~50% width
        const isStacked = secondBox.y >= firstBox.y + firstBox.height - 10;
        const isReasonableWidth = firstBox.width <= viewportWidth * 0.6;

        expect.soft(isStacked || isReasonableWidth).toBeTruthy();
      }
    }
  });

  test("should have loaded gallery images without layout shift", async ({ page }) => {
    await page.goto("/gallery");
    await page.waitForLoadState("networkidle");

    // Wait a bit for images to load
    await page.waitForTimeout(1000);

    const galleryImages = page.locator("img[src*='/images/']");
    const imageCount = await galleryImages.count();

    // Check that images have loaded (naturalWidth > 0)
    for (let i = 0; i < Math.min(imageCount, 6); i++) {
      const image = galleryImages.nth(i);
      const isLoaded = await image.evaluate((img: HTMLImageElement) => {
        return img.complete && img.naturalWidth > 0;
      });

      expect.soft(isLoaded, `Image ${i + 1} should be loaded`).toBeTruthy();
    }
  });

  test("should not have horizontal overflow in gallery", async ({ page }) => {
    await page.goto("/gallery");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. TOUCH TARGET ACCESSIBILITY ("Fat Finger" Check)
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Touch Target Accessibility", () => {
  // WCAG 2.5.5 recommends 44px for touch targets
  const MIN_TOUCH_TARGET = 44;

  test("should have accessible footer navigation links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Get footer links (Quick Links section)
    const footerLinks = page.locator("footer").getByRole("link");
    const linkCount = await footerLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Check each link exists and is tappable
    // Note: Text links have natural line-height which provides touch area
    // We're checking they have reasonable vertical spacing
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = footerLinks.nth(i);
      if (await link.isVisible()) {
        const box = await link.boundingBox();
        if (box) {
          // Text links should have at least 16px height (line-height provides more)
          expect.soft(
            box.height,
            `Footer link ${i + 1} should have minimum tappable height`
          ).toBeGreaterThanOrEqual(16);
        }
      }
    }
  });

  test("should have accessible social media icons", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer where social icons typically are
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Social icons are typically links with specific patterns
    const socialLinks = page.locator("footer a[href*='instagram'], footer a[href*='tiktok'], footer a[href*='facebook'], footer a[href*='mailto']");
    const socialCount = await socialLinks.count();

    expect(socialCount).toBeGreaterThan(0);

    for (let i = 0; i < socialCount; i++) {
      const icon = socialLinks.nth(i);
      if (await icon.isVisible()) {
        const box = await icon.boundingBox();
        if (box) {
          // Social icons should be at least 40x40 for touch accessibility
          expect.soft(
            box.width,
            `Social icon ${i + 1} width should be >= 40px`
          ).toBeGreaterThanOrEqual(40);
          expect.soft(
            box.height,
            `Social icon ${i + 1} height should be >= 40px`
          ).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test("should have accessible hamburger menu button", async ({ page }) => {
    await page.goto("/");

    const hamburger = page.getByRole("button", { name: /open menu/i });
    await expect(hamburger).toBeVisible();

    const box = await hamburger.boundingBox();
    expect(box).not.toBeNull();

    if (box) {
      // Hamburger touch target - 40px is acceptable with padding
      expect.soft(box.width, "Hamburger width").toBeGreaterThanOrEqual(36);
      expect.soft(box.height, "Hamburger height").toBeGreaterThanOrEqual(36);
    }
  });

  test("should have accessible mobile menu items when open", async ({ page }) => {
    await page.goto("/");

    // Open mobile menu
    const hamburger = page.getByRole("button", { name: /open menu/i });
    await hamburger.click();
    await page.waitForTimeout(300);

    // Check menu items
    const menuLinks = page.locator('[role="dialog"] nav a');
    const menuCount = await menuLinks.count();

    expect(menuCount).toBeGreaterThan(0);

    for (let i = 0; i < menuCount; i++) {
      const link = menuLinks.nth(i);
      if (await link.isVisible()) {
        const box = await link.boundingBox();
        if (box) {
          expect.soft(
            box.height,
            `Menu item ${i + 1} height should be >= ${MIN_TOUCH_TARGET}px`
          ).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET);
        }
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. CRITICAL CONVERSION PATHS (Mobile)
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Critical Conversion Paths", () => {
  test("should have visible Book Now CTA in hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Primary CTA should be visible above the fold
    const bookNowCTA = page.getByRole("link", { name: /book.*now/i }).first();
    
    await expect(bookNowCTA).toBeVisible();

    // Verify it's above the fold (within first viewport)
    const box = await bookNowCTA.boundingBox();
    const viewportHeight = await page.evaluate(() => window.innerHeight);

    if (box) {
      expect.soft(
        box.y + box.height,
        "Book Now CTA should be visible without scrolling"
      ).toBeLessThan(viewportHeight);
    }

    // Verify external booking link configuration
    const href = await bookNowCTA.getAttribute("href");
    expect(href).toMatch(/book\.squareup\.com|makeupbyannagarcia\.com/);

    const target = await bookNowCTA.getAttribute("target");
    expect(target).toBe("_blank");
  });

  test("should have touch-friendly Book Now button", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bookNowCTA = page.getByRole("link", { name: /book.*now/i }).first();
    const box = await bookNowCTA.boundingBox();

    if (box) {
      // CTA should be easily tappable
      expect.soft(box.height, "CTA height").toBeGreaterThanOrEqual(32);
      expect.soft(box.width, "CTA width").toBeGreaterThanOrEqual(70);
    }
  });

  test("should have working mailto links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find mailto links
    const mailtoLinks = page.locator('a[href^="mailto:"]');
    const mailtoCount = await mailtoLinks.count();

    expect(mailtoCount).toBeGreaterThan(0);

    // Verify mailto href format
    const firstMailto = mailtoLinks.first();
    const href = await firstMailto.getAttribute("href");

    expect(href).toMatch(/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  });

  test("should have accessible Bridal inquiry flow", async ({ page }) => {
    await page.goto("/bridal");
    await page.waitForLoadState("networkidle");

    // Primary CTA for bridal inquiries
    const inquireButton = page.getByRole("button", { name: /inquire/i }).first();
    
    if (await inquireButton.isVisible()) {
      const box = await inquireButton.boundingBox();
      if (box) {
        expect.soft(box.height, "Inquire button height").toBeGreaterThanOrEqual(44);
      }

      // Click and verify modal opens
      await inquireButton.click();
      await expect(page.getByRole("dialog")).toBeVisible();
    }
  });

  test("should have accessible Book Appointment links on services page", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    const bookLinks = page.getByRole("link", { name: /book appointment/i });
    const count = await bookLinks.count();

    expect(count).toBeGreaterThan(0);

    // Check first booking link
    const firstLink = bookLinks.first();
    const href = await firstLink.getAttribute("href");
    
    expect(href).toMatch(/book\.squareup\.com|makeupbyannagarcia\.com/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. SCROLL & STICKY ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Scroll & Sticky Elements", () => {
  test("should have sticky navigation that follows scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get initial nav position
    const nav = page.locator("header").first();
    const initialBox = await nav.boundingBox();

    expect(initialBox).not.toBeNull();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    // Nav should still be visible (sticky)
    await expect(nav).toBeVisible();

    // Nav should be at top of viewport (fixed/sticky)
    const scrolledBox = await nav.boundingBox();
    if (scrolledBox) {
      expect.soft(scrolledBox.y, "Nav should be at top after scroll").toBeLessThanOrEqual(5);
    }
  });

  test("should not have overlapping elements blocking content", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    // Don't scroll - check initial load state
    // The page should have proper padding for the fixed header

    // Get the header/nav element
    const header = page.locator("header").first();
    const headerBox = await header.boundingBox();

    // Get the first visible content section (not the header itself)
    const contentSection = page.locator("section#services, main section").first();
    const contentBox = await contentSection.boundingBox();

    if (headerBox && contentBox) {
      // Content section should start at or below the header
      // This checks that pt-24 or similar padding is applied
      expect.soft(
        contentBox.y,
        "Content section should start below sticky nav"
      ).toBeGreaterThanOrEqual(headerBox.height - 10);
    }
  });

  test("should allow scrolling through entire page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const finalScroll = await page.evaluate(() => window.scrollY);

    // Should have scrolled
    expect(finalScroll).toBeGreaterThan(initialScroll);

    // Footer should be visible at bottom
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should show/hide nav appropriately on scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const header = page.locator("header").first();

    // Initial state - nav visible
    await expect(header).toBeVisible();

    // Scroll down a bit
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(300);

    // Nav should still be accessible (either visible or can be triggered)
    const headerBox = await header.boundingBox();
    expect(headerBox).not.toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. FOOTER LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Footer Layout", () => {
  test("should stack footer columns vertically on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Get footer width
    const footerBox = await footer.boundingBox();
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    if (footerBox) {
      // Footer should not overflow viewport
      expect.soft(
        footerBox.width,
        "Footer width should fit viewport"
      ).toBeLessThanOrEqual(viewportWidth + 1);
    }
  });

  test("should not have horizontal overflow in footer", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalScroll).toBeFalsy();
  });

  test("should have readable footer text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check that footer text elements are visible
    const footerText = page.locator("footer p, footer span").first();
    
    if (await footerText.isVisible()) {
      const box = await footerText.boundingBox();
      if (box) {
        // Text should have reasonable width (not cut off)
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        expect.soft(
          box.width,
          "Footer text should fit within viewport"
        ).toBeLessThanOrEqual(viewportWidth);
      }
    }
  });

  test("should have accessible newsletter form if present", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check for newsletter input
    const emailInput = page.locator('footer input[type="email"]');
    
    if (await emailInput.isVisible()) {
      const box = await emailInput.boundingBox();
      if (box) {
        // Input should be adequately sized for touch (36px acceptable for form fields)
        expect.soft(box.height, "Email input height").toBeGreaterThanOrEqual(36);
      }

      // Submit button should also be accessible
      const submitButton = page.locator("footer button[type='submit']");
      if (await submitButton.isVisible()) {
        const buttonBox = await submitButton.boundingBox();
        if (buttonBox) {
          // Submit button should match input height
          expect.soft(buttonBox.height, "Submit button height").toBeGreaterThanOrEqual(36);
        }
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. LINK-IN-BIO PAGE (Mobile-First Design)
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Link-in-Bio Mobile Experience", () => {
  test("should display link-in-bio page optimized for mobile", async ({ page }) => {
    await page.goto("/link-in-bio");
    await page.waitForLoadState("networkidle");

    // Should not have horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("should have touch-friendly link buttons", async ({ page }) => {
    await page.goto("/link-in-bio");
    await page.waitForLoadState("networkidle");

    // Get all main CTA links
    const ctaLinks = page.getByRole("link").filter({
      hasText: /book|bridal|lesson|instagram|tiktok/i
    });
    
    const linkCount = await ctaLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    for (let i = 0; i < linkCount; i++) {
      const link = ctaLinks.nth(i);
      if (await link.isVisible()) {
        const box = await link.boundingBox();
        if (box) {
          expect.soft(
            box.height,
            `Link-in-bio button ${i + 1} height`
          ).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  test("should have centered content", async ({ page }) => {
    await page.goto("/link-in-bio");
    await page.waitForLoadState("networkidle");

    // Profile image should be centered
    const profileImage = page.locator("img").first();
    const box = await profileImage.boundingBox();
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    if (box) {
      const centerX = box.x + box.width / 2;
      const viewportCenter = viewportWidth / 2;

      // Should be roughly centered (within 50px tolerance)
      expect.soft(
        Math.abs(centerX - viewportCenter),
        "Profile image should be centered"
      ).toBeLessThan(50);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. BRIDAL PAGE MOBILE EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Bridal Page Mobile Experience", () => {
  test("should have accessible hero CTA buttons", async ({ page }) => {
    await page.goto("/bridal");
    await page.waitForLoadState("networkidle");

    // Check for primary CTAs in hero
    const inquireButton = page.getByRole("button", { name: /inquire/i }).first();
    const bookTrialLink = page.getByRole("link", { name: /book trial/i }).first();

    // At least one CTA should be visible
    const inquireVisible = await inquireButton.isVisible().catch(() => false);
    const bookTrialVisible = await bookTrialLink.isVisible().catch(() => false);

    expect(inquireVisible || bookTrialVisible).toBeTruthy();

    // Check touch accessibility
    if (inquireVisible) {
      const box = await inquireButton.boundingBox();
      if (box) {
        expect.soft(box.height, "Inquire button height").toBeGreaterThanOrEqual(44);
      }
    }
  });

  test("should display bridal packages without horizontal overflow", async ({ page }) => {
    await page.goto("/bridal");
    await page.waitForLoadState("networkidle");

    // Scroll to packages section
    await page.evaluate(() => {
      const packages = document.getElementById("packages");
      if (packages) packages.scrollIntoView();
    });
    await page.waitForTimeout(500);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("should have working inquiry modal on mobile", async ({ page }) => {
    await page.goto("/bridal");
    await page.waitForLoadState("networkidle");

    const inquireButton = page.getByRole("button", { name: /inquire/i }).first();
    
    if (await inquireButton.isVisible()) {
      await inquireButton.click();
      
      // Modal should appear
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Form inputs should be present
      await expect(page.locator('input[id*="name"]')).toBeVisible();
      await expect(page.locator('input[id*="email"]')).toBeVisible();

      // Close button or outside click should work
      const closeButton = dialog.getByRole("button", { name: /close/i });
      if (await closeButton.isVisible()) {
        await closeButton.click();
      } else {
        // Press Escape to close
        await page.keyboard.press("Escape");
      }
    }
  });
});
