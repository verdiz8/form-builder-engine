"use client";
import { useState, useCallback } from "react";
import type { FormSchema } from "@/lib/schema-types";
import { validateSection } from "@/lib/validation";
import { calculateScores, type ScoreResult } from "@/lib/scoring";
import { FormSection } from "./form-section";
import { ScoreSummary } from "./score-summary";

interface Props {
  schema: FormSchema;
}

export function FormRenderer({ schema }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [currentSection, setCurrentSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<ScoreResult | null>(null);

  const handleChange = useCallback((fieldId: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  const handleBlur = useCallback((fieldId: string) => {
    setTouched((prev) => new Set(prev).add(fieldId));
  }, []);

  const validateCurrentSection = (): boolean => {
    const section = schema.sections[currentSection];
    const sectionErrors = validateSection(section.fields, values);
    setErrors((prev) => ({ ...prev, ...sectionErrors }));
    return Object.keys(sectionErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentSection()) return;
    if (currentSection < schema.sections.length - 1) {
      setCurrentSection((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSection((s) => Math.max(0, s - 1));
  };

  const handleSubmit = () => {
    if (!validateCurrentSection()) return;

    let allValid = true;
    for (const section of schema.sections) {
      const sectionErrors = validateSection(section.fields, values);
      if (Object.keys(sectionErrors).length > 0) allValid = false;
      setErrors((prev) => ({ ...prev, ...sectionErrors }));
    }

    if (!allValid) {
      for (let i = 0; i < schema.sections.length; i++) {
        const errs = validateSection(schema.sections[i].fields, values);
        if (Object.keys(errs).length > 0) {
          setCurrentSection(i);
          break;
        }
      }
      return;
    }

    if (schema.scoring?.enabled) {
      const numericValues: Record<string, number> = {};
      for (const [key, val] of Object.entries(values)) {
        if (typeof val === "string" && val !== "")
          numericValues[key] = parseInt(val, 10);
        if (typeof val === "number") numericValues[key] = val;
      }
      setScore(calculateScores(schema, numericValues));
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6" data-testid="form-submitted">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <div className="mb-2 text-2xl">✓</div>
          <h3 className="text-lg font-semibold text-emerald-900">Submitted</h3>
          <p className="text-sm text-emerald-700">
            {schema.scoring?.enabled
              ? "Scores calculated below."
              : "Thank you for your submission."}
          </p>
        </div>

        {score && <ScoreSummary result={score} />}

        <button
          onClick={() => {
            setSubmitted(false);
            setValues({});
            setErrors({});
            setTouched(new Set());
            setCurrentSection(0);
            setScore(null);
          }}
          data-testid="reset-form"
          className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-50"
        >
          Start over
        </button>
      </div>
    );
  }

  const section = schema.sections[currentSection];
  const isLast = currentSection === schema.sections.length - 1;
  const isFirst = currentSection === 0;

  return (
    <div className="space-y-6" data-testid="form-renderer">
      {schema.sections.length > 1 && (
        <div className="flex items-center gap-1.5">
          {schema.sections.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= currentSection ? "bg-emerald-400" : "bg-stone-200"
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-stone-400">
            {currentSection + 1}/{schema.sections.length}
          </span>
        </div>
      )}

      <FormSection
        section={section}
        values={values}
        errors={errors}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className="flex justify-between gap-3 border-t border-stone-100 pt-4">
        {!isFirst ? (
          <button
            type="button"
            onClick={handlePrev}
            data-testid="prev-section"
            className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-50"
          >
            ← Previous
          </button>
        ) : (
          <span />
        )}

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            data-testid="submit-form"
            className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            data-testid="next-section"
            className="rounded-lg bg-stone-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-900"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
