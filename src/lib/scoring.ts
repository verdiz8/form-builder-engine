import type { FormSchema, FormField } from "./schema-types";

export interface SectionScore {
  sectionId: string;
  sectionTitle: string;
  weight: number;
  maxPossible: number;
  achieved: number;
  percentage: number;
  weightedContribution: number;
}

export interface ScoreResult {
  sections: SectionScore[];
  totalWeighted: number;
  totalMax: number;
  overallPercentage: number;
  grade: string;
}

/**
 * Calculate weighted scores from form submissions.
 * Maps directly to the KPI evaluation use case.
 */
export function calculateScores(
  schema: FormSchema,
  values: Record<string, number>
): ScoreResult {
  const scoring = schema.scoring;
  if (!scoring?.enabled) {
    return {
      sections: [],
      totalWeighted: 0,
      totalMax: 0,
      overallPercentage: 0,
      grade: "N/A",
    };
  }

  const sections: SectionScore[] = schema.sections.map((section) => {
    const weight = section.weight ?? 0;
    const ratingFields = section.fields.filter(
      (f: FormField) => f.type === "rating"
    );
    const maxPossible = ratingFields.reduce(
      (a, b) => a + (b.maxRating ?? 5),
      0
    );
    const achieved = ratingFields.reduce(
      (sum, f) => sum + (values[f.id] ?? 0),
      0
    );
    const percentage = maxPossible > 0 ? (achieved / maxPossible) * 100 : 0;
    const weightedContribution =
      scoring.totalWeight > 0
        ? (percentage * weight) / scoring.totalWeight
        : 0;

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      weight,
      maxPossible,
      achieved,
      percentage: Math.round(percentage * 10) / 10,
      weightedContribution: Math.round(weightedContribution * 10) / 10,
    };
  });

  const totalWeighted = sections.reduce(
    (s, sec) => s + sec.weightedContribution,
    0
  );
  const totalMax = sections.reduce((s, sec) => s + sec.maxPossible, 0);
  const totalAchieved = sections.reduce((s, sec) => s + sec.achieved, 0);
  const overallPercentage =
    totalMax > 0
      ? Math.round((totalAchieved / totalMax) * 1000) / 10
      : 0;

  return {
    sections,
    totalWeighted: Math.round(totalWeighted * 10) / 10,
    totalMax,
    overallPercentage,
    grade: getGrade(overallPercentage),
  };
}

function getGrade(pct: number): string {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}
