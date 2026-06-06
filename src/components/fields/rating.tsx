"use client";
import type { FormField } from "@/lib/schema-types";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}

export function RatingField({ field, value, error, onChange, onBlur }: Props) {
  const max = field.maxRating ?? 5;
  const current = value ? parseInt(value, 10) : 0;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div
        data-testid={`field-${field.id}`}
        className="flex gap-1"
        onBlur={onBlur}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            data-testid={`rating-${field.id}-${star}`}
            onClick={() => onChange(String(star))}
            className={`text-2xl transition-colors min-w-[28px] ${
              star <= current
                ? "text-amber-400"
                : "text-stone-200 hover:text-amber-200"
            }`}
            aria-label={`Rate ${star} out of ${max}`}
          >
            ★
          </button>
        ))}
        {current > 0 && (
          <span className="ml-2 self-end pb-1 text-xs text-stone-400">
            {current}/{max}
          </span>
        )}
      </div>
      {error && (
        <p data-testid={`error-${field.id}`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
