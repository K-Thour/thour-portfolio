import { useState, useCallback } from "react";
import type { ResumeFormData } from "../../../types";

export function useResumeForm(initialData?: ResumeFormData | null) {
  const [formData, setFormData] = useState<ResumeFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    jobLink: initialData?.jobLink || "",
    designType: initialData?.designType || null,
    designFile: initialData?.designFile,
    designUrl: initialData?.designUrl || "",
    latexCode: initialData?.latexCode || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    <K extends keyof ResumeFormData>(field: K, value: ResumeFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as string]) {
        setErrors((prev) => ({ ...prev, [field as string]: "" }));
      }
    },
    [errors],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Resume name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.jobLink.trim()) {
      newErrors.jobLink = "Job link is required";
    } else if (!/^https?:\/\/.+/.test(formData.jobLink)) {
      newErrors.jobLink = "Please enter a valid URL";
    }

    if (formData.designType === "latex" && !formData.latexCode?.trim()) {
      newErrors.latexCode = "LaTeX code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  return { formData, errors, updateField, validateForm };
}
