import { useState, useCallback } from "react";
import type { ResumeFormData } from "../types";
import { initialFormData } from "../data/initialData";

export function useResumeForm(initialData?: ResumeFormData | null) {
  const [formData, setFormData] = useState<ResumeFormData>(
    initialData || initialFormData,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResumeFormData, string>>
  >({});

  const updateField = useCallback(
    <K extends keyof ResumeFormData>(field: K, value: ResumeFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
    },
    [],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ResumeFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Resume title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Summary or focus area is required";
    }
    if (
      formData.jobLink?.trim() &&
      !/^https?:\/\/.+/i.test(formData.jobLink.trim())
    ) {
      newErrors.jobLink = "Please enter a valid URL (e.g., https://...)";
    }

    if (formData.designType === "latex" && !formData.latexCode?.trim()) {
      newErrors.latexCode = "LaTeX code is required for LaTeX template";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const updateForm = useCallback((data: ResumeFormData) => {
    setFormData(data);
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    updateField,
    setFormData,
    setErrors,
    validateForm,
    resetForm,
    updateForm,
  };
}
