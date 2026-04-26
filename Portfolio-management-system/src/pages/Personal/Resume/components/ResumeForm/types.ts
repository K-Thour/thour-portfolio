import type { ResumeFormData } from "../../types";

export type DesignModalType = "file" | "latex";

export interface DesignFormData {
  name: string;
  file?: File;
  latexCode?: string;
}

export interface FormSectionProps {
  formData: ResumeFormData;
  errors: Record<string, string>;
  isDark: boolean;
  updateField: <K extends keyof ResumeFormData>(
    field: K,
    value: ResumeFormData[K],
  ) => void;
}
