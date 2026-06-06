import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  timeout: 30_000,

  use: {
    baseURL: "http://localhost:7200",
    trace: "on-first-retry",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:7200",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
});
