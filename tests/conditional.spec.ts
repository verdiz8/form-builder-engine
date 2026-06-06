import { test, expect } from "@playwright/test";

test.describe("Conditional field visibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="preset-kpi"]');
    await page.waitForSelector('[data-testid="form-renderer"]');
  });

  test("conditional field hidden by default", async () => {
    // Navigate to section 3 (Additional Qualities)
    const ratingFields = ["lesson-planning", "classroom-delivery", "assessment-practices", "curriculum-knowledge"];
    for (const id of ratingFields) {
      await page.click(`[data-testid="rating-${id}-3"]`);
    }
    await page.click('[data-testid="next-section"]');
    // Fill section 2 ratings
    await page.click('[data-testid="rating-punctuality-3"]');
    await page.click('[data-testid="rating-collegiality-3"]');
    await page.click('[data-testid="rating-communication-3"]');
    await page.click('[data-testid="next-section"]');

    // Digital literacy should be hidden initially
    await expect(page.locator('[data-testid="field-digital-literacy"]')).not.toBeVisible();
  });

  test("conditional field appears when condition met", async () => {
    // Navigate to section 3
    const ratingFields = ["lesson-planning", "classroom-delivery", "assessment-practices", "curriculum-knowledge"];
    for (const id of ratingFields) {
      await page.click(`[data-testid="rating-${id}-3"]`);
    }
    await page.click('[data-testid="next-section"]');
    await page.click('[data-testid="rating-punctuality-3"]');
    await page.click('[data-testid="rating-collegiality-3"]');
    await page.click('[data-testid="rating-communication-3"]');
    await page.click('[data-testid="next-section"]');

    // Select "Multiple roles" — should reveal digital literacy field
    await page.selectOption('[data-testid="field-extracurricular"]', "multiple");
    await expect(page.locator('[data-testid="field-digital-literacy"]')).toBeVisible();
  });
});
