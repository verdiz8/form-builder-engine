"use client";
import type { FormField } from "@/lib/schema-types";

interface Props {
  field: FormField;
  value: string | string[];
  error?: string;
  multiple?: boolean;
  onChange: (v: string | string[]) => void;
  onBlur: () => void;
}

export function SelectField({
  field,
  value,
  error,
  multiple,
  onChange,
  onBlur,
}: Props) {
  const options = field.options ?? [];

  if (multiple) {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-stone-700">
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <div data-testid={`field-${field.id}`} className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                data-testid={`option-${field.id}-${opt.value}`}
                onClick={() => {
                  const next = isSelected
                    ? selected.filter((v) => v !== opt.value)
                    : [...selected, opt.value];
                  onChange(next);
                }}
                onBlur={onBlur}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  isSelected
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {error && (
          <p data-testid={`error-${field.id}`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-stone-700"
      >
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        id={field.id}
        data-testid={`field-${field.id}`}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          error
            ? "border-red-300 bg-red-50"
            : "border-stone-200 bg-white hover:border-stone-300"
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p data-testid={`error-${field.id}`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
