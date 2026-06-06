"use client";
import type { ScoreResult } from "@/lib/scoring";

interface Props {
  result: ScoreResult;
}

export function ScoreSummary({ result }: Props) {
  if (!result.sections.length) return null;

  return (
    <div
      className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6"
      data-testid="score-summary"
    >
      <h3 className="mb-4 text-lg font-semibold text-emerald-900">
        Score Summary
      </h3>

      {/* Overall */}
      <div className="mb-5 flex items-center gap-4">
        <div className="text-3xl font-bold text-emerald-700">
          {result.overallPercentage}%
        </div>
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
          Grade {result.grade}
        </div>
      </div>

      {/* Per-section breakdown */}
      <div className="space-y-2">
        {result.sections.map((sec) => (
          <div key={sec.sectionId} className="flex items-center gap-3">
            <span className="min-w-0 flex-1 truncate text-sm text-stone-700">
              {sec.sectionTitle}
            </span>
            <span className="text-xs text-stone-400">weight {sec.weight}</span>
            <div className="w-24">
              <div className="h-2 rounded-full bg-stone-200">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${Math.min(sec.percentage, 100)}%` }}
                />
              </div>
            </div>
            <span className="w-12 text-right text-sm font-medium text-stone-700">
              {sec.percentage}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-emerald-200 pt-3 text-sm text-stone-500">
        Weighted total:{" "}
        <span className="font-medium text-stone-700">
          {result.totalWeighted}
        </span>
      </div>
    </div>
  );
}
