import { useState } from "react";
import type { EducationFormData, Education } from "../types";

export function useEducationForm(initialData?: Education | null) {
  const parsePeriod = (
    period?: string,
  ): { startDate: string; endDate: string; current: boolean } => {
    if (!period) return { startDate: "", endDate: "", current: false };
    const parts = period.split(" - ");
    const startDate = parts[0] || "";
    const endPart = parts[1] || "";
    const current = endPart === "Present";
    const endDate = current ? "" : endPart;
    return { startDate, endDate, current };
  };

  const { startDate, endDate, current } = parsePeriod(initialData?.period);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EducationFormData, string>>
  >({});
  const [formData, setFormData] = useState<EducationFormData>({
    level: (initialData as any)?.level || "graduation",
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    startDate,
    endDate,
    current,
    gradeType: (initialData as any)?.gradeType || "cgpa",
    grade: initialData?.grade || "",
    description: initialData?.description || "",
    achievements:
      (initialData as any)?.achievements || [],
  });

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof EducationFormData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.level) {
          (newErrors as any).level = "Education level is required";
        }
        if (!formData.degree.trim()) newErrors.degree = "Degree is required";
        if (!formData.institution.trim())
          newErrors.institution = "Institution is required";
        break;
      case 2:
        if (!formData.startDate) {
          newErrors.startDate = "Start date is required";
        }
        if (!formData.current) {
          if (!formData.endDate) {
            newErrors.endDate = "End date is required";
          } else if (
            formData.startDate &&
            new Date(formData.endDate) < new Date(formData.startDate)
          ) {
            newErrors.endDate = "End date cannot be before start date";
          }
        }
        if (!formData.description.trim()) {
          newErrors.description = "Description is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = <K extends keyof EducationFormData>(
    field: K,
    value: EducationFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addAchievement = (achievement: string) => {
    if (achievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievement.trim()],
      }));
    }
  };

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    validateStep,
    updateField,
    addAchievement,
    removeAchievement,
  };
}
