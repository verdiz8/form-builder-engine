import { test, expect } from "@playwright/test";

test.describe("Form Renderer — KPI Evaluation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Ensure KPI preset is loaded
    await page.click('[data-testid="preset-kpi"]');
    await page.waitForSelector('[data-testid="form-renderer"]');
  });

  test("renders form title and first section", async ({ page }) => {
    await expect(page.locator('[data-testid="form-title"]')).toContainText("Teacher KPI Evaluation");
    // First section fields should be visible
    await expect(page.locator('[data-testid="field-lesson-planning"]')).toBeVisible();
    await expect(page.locator('[data-testid="field-classroom-delivery"]')).toBeVisible();
  });

  test("star rating registers click", async ({ page }) => {
    // Click 4th star on first rating field
    await page.click('[data-testid="rating-lesson-planning-4"]');
    // Verify the 5th star is NOT selected (amber)
    const star5 = page.locator('[data-testid="rating-lesson-planning-5"]');
    await expect(star5).not.toHaveClass(/text-amber-400/);
  });

  test("navigates between sections", async ({ page }) => {
    // Section 1 should be visible
    await expect(page.locator('[data-testid="field-lesson-planning"]')).toBeVisible();

    // Fill required ratings to pass validation
    const ratingFields = ["lesson-planning", "classroom-delivery", "assessment-practices", "curriculum-knowledge"];
    for (const id of ratingFields) {
      await page.click(`[data-testid="rating-${id}-3"]`);
    }

    // Go to next section
    await page.click('[data-testid="next-section"]');
    await expect(page.locator('[data-testid="field-punctuality"]')).toBeVisible();

    // Go back
    await page.click('[data-testid="prev-section"]');
    await expect(page.locator('[data-testid="field-lesson-planning"]')).toBeVisible();
  });
});
