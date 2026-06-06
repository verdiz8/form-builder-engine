import { test, expect } from "@playwright/test";

test.describe("Weighted scoring", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="preset-kpi"]');
    await page.waitForSelector('[data-testid="form-renderer"]');
  });

  test("calculates and displays scores on submit", async ({ page }) => {
    // Fill section 1 ratings (Professional Competence — weight 50)
    const section1 = ["lesson-planning", "classroom-delivery", "assessment-practices", "curriculum-knowledge"];
    for (const id of section1) {
      await page.click(`[data-testid="rating-${id}-4"]`); // 4/5 each
    }
    await page.click('[data-testid="next-section"]');

    // Fill section 2 ratings (Personal Attributes — weight 30)
    const section2 = ["punctuality", "collegiality", "communication"];
    for (const id of section2) {
      await page.click(`[data-testid="rating-${id}-3"]`); // 3/5 each
    }
    await page.click('[data-testid="next-section"]');

    // Section 3 — select extracurricular
    await page.selectOption('[data-testid="field-extracurricular"]', "club");
    await page.click('[data-testid="submit-form"]');

    // Should show score summary
    await expect(page.locator('[data-testid="score-summary"]')).toBeVisible();
    // Overall percentage should be displayed
    await expect(page.locator('[data-testid="score-summary"]')).toContainText("%");
    // Grade should be displayed
    await expect(page.locator('[data-testid="score-summary"]')).toContainText("Grade");
  });
});
