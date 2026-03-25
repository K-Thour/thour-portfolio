import { useState } from "react";
import type { ProjectFormData, Project } from "../../types";
import { getProjectFormData, PROJECT_STEPS } from "../utils/projectFormUtils";

export function useProjectForm(initialData?: Project) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ProjectFormData>(
    getProjectFormData(initialData),
  );

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.subtitle.trim())
          newErrors.subtitle = "Subtitle is required";
        if (!formData.category.trim())
          newErrors.category = "Category is required";
        break;
      case 2:
        if (!formData.description.trim())
          newErrors.description = "Short description is required";
        if (!formData.longDescription.trim())
          newErrors.longDescription = "Long description is required";
        break;
      case 3:
        if (formData.technologies.length === 0)
          newErrors.technologies = "Add at least one technology";
        if (formData.features.length === 0)
          newErrors.features = "Add at least one feature";
        break;
      case 4:
        if (!formData.github.trim())
          newErrors.github = "GitHub URL is required";
        if (!formData.liveUrl.trim())
          newErrors.liveUrl = "Live URL is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (onSubmit: (data: ProjectFormData) => void) => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return {
    currentStep,
    errors,
    formData,
    steps: PROJECT_STEPS,
    handleNext,
    handlePrevious,
    updateFormData,
    setErrors,
  };
}
