import type { FormField, FieldValidation } from "./schema-types";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate a single field value against its schema definition.
 * Returns structured errors — never throws.
 */
export function validateField(
  field: FormField,
  value: unknown
): ValidationResult {
  const v = field.validation ?? {};
  const required = field.required ?? false;

  // Required check
  if (required && (value === null || value === undefined || value === "")) {
    return { valid: false, error: "This field is required" };
  }

  // Empty non-required is always valid
  if (!required && (value === null || value === undefined || value === "")) {
    return { valid: true };
  }

  switch (field.type) {
    case "number":
      return validateNumber(v, value);
    case "text":
      return validateText(v, value as string);
    case "rating":
      return validateNumber(
        { min: 1, max: field.maxRating ?? 5 },
        value
      );
    default:
      return { valid: true };
  }
}

function validateNumber(
  v: FieldValidation,
  value: unknown
): ValidationResult {
  // Coerce string values (e.g. from rating buttons or text inputs)
  const num = typeof value === "number" ? value : Number(value);
  if (typeof value !== "number" && (typeof value !== "string" || value === "" || isNaN(num))) {
    return { valid: false, error: "Must be a number" };
  }
  if (v.min !== undefined && num < v.min) {
    return { valid: false, error: `Minimum value is ${v.min}` };
  }
  if (v.max !== undefined && num > v.max) {
    return { valid: false, error: `Maximum value is ${v.max}` };
  }
  return { valid: true };
}

function validateText(
  v: FieldValidation,
  value: string
): ValidationResult {
  if (v.minLength !== undefined && value.length < v.minLength) {
    return {
      valid: false,
      error: `Minimum ${v.minLength} characters required`,
    };
  }
  if (v.maxLength !== undefined && value.length > v.maxLength) {
    return {
      valid: false,
      error: `Maximum ${v.maxLength} characters allowed`,
    };
  }
  if (v.pattern && !new RegExp(v.pattern).test(value)) {
    return { valid: false, error: "Invalid format" };
  }
  return { valid: true };
}

/**
 * Validate all fields in a section.
 * Returns a map of fieldId → error message.
 */
export function validateSection(
  fields: FormField[],
  values: Record<string, any>
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const result = validateField(field, values[field.id]);
    if (!result.valid && result.error) {
      errors[field.id] = result.error;
    }
  }
  return errors;
}
