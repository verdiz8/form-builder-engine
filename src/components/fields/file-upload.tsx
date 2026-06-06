"use client";
import { useRef, useState } from "react";
import type { FormField } from "@/lib/schema-types";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}

export function FileUploadField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = field.validation?.maxSize;
    const accepted = field.validation?.acceptedTypes;

    if (maxSize && file.size > maxSize) {
      onChange("");
      setFileName("");
      return;
    }

    if (accepted && !accepted.some((t) => file.type.match(t.replace("*", ".*")))) {
      onChange("");
      setFileName("");
      return;
    }

    setFileName(file.name);
    onChange(file.name);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div data-testid={`field-${field.id}`}>
        <input
          ref={inputRef}
          type="file"
          id={field.id}
          data-testid={`file-input-${field.id}`}
          onChange={handleFile}
          onBlur={onBlur}
          accept={field.validation?.acceptedTypes?.join(",")}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`rounded-lg border border-dashed px-4 py-3 text-sm transition-colors ${
            error
              ? "border-red-300 bg-red-50 text-red-600"
              : fileName
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-stone-300 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-600"
          }`}
        >
          {fileName || field.placeholder || "Choose file..."}
        </button>
      </div>
      {error && (
        <p data-testid={`error-${field.id}`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
