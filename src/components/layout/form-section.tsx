"use client";
import type { FormSection as FormSectionType } from "@/lib/schema-types";
import {
  TextField,
  NumberField,
  SelectField,
  DateField,
  FileUploadField,
  RatingField,
} from "@/components/fields";

interface Props {
  section: FormSectionType;
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: any) => void;
  onBlur: (fieldId: string) => void;
}

export function FormSection({
  section,
  values,
  errors,
  onChange,
  onBlur,
}: Props) {
  const isVisible = (field: FormSectionType["fields"][0]) => {
    if (!field.condition) return true;
    const depValue = values[field.condition.field];
    return depValue === field.condition.value;
  };

  return (
    <fieldset className="space-y-5">
      <div className="border-b border-stone-200 pb-2">
        <legend className="text-base font-semibold text-stone-800">
          {section.title}
        </legend>
        {section.description && (
          <p className="mt-0.5 text-xs text-stone-500">{section.description}</p>
        )}
        {section.weight && (
          <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            Weight: {section.weight}%
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {section.fields.filter(isVisible).map((field) => {
          const props = {
            field,
            value: values[field.id] ?? "",
            error: errors[field.id],
            onChange: (v: any) => onChange(field.id, v),
            onBlur: () => onBlur(field.id),
          };

          const wrapClass =
            field.type === "text" || field.type === "file"
              ? "sm:col-span-2"
              : "";

          return (
            <div key={field.id} className={wrapClass}>
              {field.type === "text" && <TextField {...props} />}
              {field.type === "number" && <NumberField {...props} />}
              {field.type === "select" && <SelectField {...props} />}
              {field.type === "multi-select" && (
                <SelectField {...props} multiple />
              )}
              {field.type === "date" && <DateField {...props} />}
              {field.type === "file" && <FileUploadField {...props} />}
              {field.type === "rating" && <RatingField {...props} />}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
