import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for Amor Glam Booking Website
 * Updated for Playwright 1.50+ with Next.js 16 support
 * 
 * Features:
 * - Comprehensive E2E testing setup with Square integration support
 * - Mobile-first testing with multiple device profiles
 * - Enhanced reporting and debugging capabilities
 */
export default defineConfig({
  testDir: "./e2e",
  
  // Parallel execution for faster test runs
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration - multiple formats for different use cases
  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
    // Add GitHub Actions reporter in CI
    ...(process.env.CI ? [["github"] as const] : []),
  ],
  
  // Global timeout settings
  timeout: 60000,
  
  // Expect timeout
  expect: {
    timeout: 10000,
    // Snapshot testing configuration
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
  
  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    
    // Collect trace when retrying the failed test
    trace: "on-first-retry",
    
    // Screenshot on failure
    screenshot: "only-on-failure",
    
    // Record video only when retrying
    video: "retain-on-failure",
    
    // Action and navigation timeouts
    actionTimeout: 15000,
    navigationTimeout: 30000,
    
    // Locale and timezone for consistent testing
    locale: "en-US",
    timezoneId: "America/Chicago",
    
    // Color scheme
    colorScheme: "light",
  },
  
  // Project configuration for different browsers and devices
  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        // Enable Chrome DevTools Protocol for debugging
        launchOptions: {
          args: ["--disable-web-security"],
        },
      },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    
    // Mobile devices - comprehensive iOS coverage
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
    
    // Android devices
    {
      name: "Pixel 7",
      use: { ...devices["Pixel 7"] },
    },
    
    // Tablet
    {
      name: "iPad Pro",
      use: { ...devices["iPad Pro 11"] },
    },
  ],
  
  // Web server configuration for local development
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    // Stdout/stderr handling
    stdout: "pipe",
    stderr: "pipe",
  },
  
  // Output directory for test artifacts
  outputDir: "test-results",
  
  // Preserve output on failure
  preserveOutput: "failures-only",
  
  // Global setup/teardown (optional - can be added later)
  // globalSetup: require.resolve('./e2e/global-setup'),
  // globalTeardown: require.resolve('./e2e/global-teardown'),
});
