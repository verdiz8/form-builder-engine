"use client";
import { useState, useEffect, useCallback } from "react";
import type { FormSchema } from "@/lib/schema-types";

interface Props {
  json: string;
  onChange: (json: string, valid: boolean, schema?: FormSchema) => void;
}

export function JsonEditor({ json, onChange }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [localJson, setLocalJson] = useState(json);

  useEffect(() => {
    setLocalJson(json);
  }, [json]);

  const validate = useCallback(
    (value: string) => {
      try {
        const parsed = JSON.parse(value);
        if (!parsed.title || !Array.isArray(parsed.sections)) {
          setError("Schema must have 'title' (string) and 'sections' (array)");
          onChange(value, false);
          return;
        }
        setError(null);
        onChange(value, true, parsed as FormSchema);
      } catch (e: any) {
        setError(e.message ?? "Invalid JSON");
        onChange(value, false);
      }
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-stone-700">
          JSON Schema
        </label>
        {error ? (
          <span className="text-xs text-red-500">{error}</span>
        ) : (
          <span className="text-xs text-emerald-600">Valid ✓</span>
        )}
      </div>
      <textarea
        data-testid="json-editor"
        value={localJson}
        onChange={(e) => {
          setLocalJson(e.target.value);
          validate(e.target.value);
        }}
        spellCheck={false}
        className={`h-64 w-full resize-none rounded-lg border p-4 font-mono text-xs leading-relaxed outline-none transition-colors focus:ring-2 focus:ring-emerald-500/20 ${
          error
            ? "border-red-200 bg-red-50/50"
            : "border-stone-200 bg-stone-50"
        }`}
      />
    </div>
  );
}
