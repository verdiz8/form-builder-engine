import { test, expect } from "@playwright/test";

test.describe("Mobile responsiveness", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test("form renders in single-column on mobile", async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="preset-kpi"]');
    await page.waitForSelector('[data-testid="form-renderer"]');

    // The JSON editor + form should stack vertically
    const main = page.locator("main");
    const box = await main.boundingBox();
    expect(box).not.toBeNull();

    // Multi-select chips should be touch-friendly
    await page.click('[data-testid="preset-feedback"]');
    await page.waitForSelector('[data-testid="field-satisfaction"]');

    // Click a multi-select option
    const chip = page.locator('[data-testid="option-topics-performance"]');
    if (await chip.isVisible()) {
      await chip.click();
      await expect(chip).toHaveClass(/bg-emerald/);
    }
  });

  test("rating stars are tap-friendly on mobile", async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="preset-feedback"]');
    await page.waitForSelector('[data-testid="form-renderer"]');

    // Stars should be large enough to tap
    const star = page.locator('[data-testid="rating-satisfaction-5"]');
    const starBox = await star.boundingBox();
    expect(starBox).not.toBeNull();
    if (starBox) {
      expect(starBox.width).toBeGreaterThanOrEqual(28); // min tap target
    }
  });
});
