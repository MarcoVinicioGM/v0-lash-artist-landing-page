import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for Amor Glam Booking Website
 * Comprehensive E2E testing setup with Square integration support
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile devices
    {
      name: "iPhone 14",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "iPhone 14 Pro Max",
      use: { ...devices["iPhone 14 Pro Max"] },
    },
    {
      name: "iPhone SE",
      use: { ...devices["iPhone SE"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
