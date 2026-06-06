"use client";
import type { FormField } from "@/lib/schema-types";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}

export function NumberField({ field, value, error, onChange, onBlur }: Props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={field.id} className="block text-sm font-medium text-stone-700">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={field.id}
        type="number"
        data-testid={`field-${field.id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        min={field.validation?.min}
        max={field.validation?.max}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.id}-error` : undefined}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          error
            ? "border-red-300 bg-red-50"
            : "border-stone-200 bg-white hover:border-stone-300"
        }`}
      />
      {error && (
        <p
          id={`${field.id}-error`}
          data-testid={`error-${field.id}`}
          className="text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
