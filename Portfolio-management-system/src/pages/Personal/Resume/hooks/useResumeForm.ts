import { useState, useCallback } from "react";
import type { ResumeFormData } from "../types";
import { initialFormData } from "../data/initialData";

export function useResumeForm() {
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResumeFormData, string>>
  >({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ResumeFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.jobLink.trim()) newErrors.jobLink = "Job link is required";
    else if (!/^https?:\/\/.+/.test(formData.jobLink))
      newErrors.jobLink = "Please enter a valid URL";
    if (
      (formData.designType === "image" || formData.designType === "pdf") &&
      !formData.designFile &&
      !formData.designUrl
    ) {
      newErrors.designType = "Please provide a design file or URL";
    }
    if (formData.designType === "latex" && !formData.latexCode?.trim()) {
      newErrors.latexCode = "LaTeX code is required";
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
    setFormData,
    setErrors,
    validateForm,
    resetForm,
    updateForm,
  };
}
