export type FieldType =
  | "text"
  | "number"
  | "select"
  | "multi-select"
  | "date"
  | "rating";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldCondition {
  field: string;
  value: unknown;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  maxSize?: number;
  acceptedTypes?: string[];
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  condition?: FieldCondition;
  options?: FieldOption[];
  validation?: FieldValidation;
  placeholder?: string;
  maxRating?: number;
}

export interface FormSection {
  id: string;
  title: string;
  weight?: number;
  fields: FormField[];
}

export interface ScoringConfig {
  enabled: boolean;
  totalWeight: number;
}

export interface FormSchema {
  title: string;
  scoring?: ScoringConfig;
  sections: FormSection[];
}

export type FormValues = Record<string, unknown>;
