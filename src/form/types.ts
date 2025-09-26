export type FieldType = 'text' | 'email' | 'number' | 'radio' | 'select' | 'checkbox' | 'tel';

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

export interface StepDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FieldDefinition[];
}

export interface FormSchema {
  steps: StepDefinition[];
}

export type FormValues = Record<string, string | boolean>;

export interface ValidationError {
  fieldId: string;
  message: string;
}


