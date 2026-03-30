import { useState } from "react";
import type { ServiceFormData, Service } from "../../types";

export function useServiceForm(initialData?: Service) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Photo and Icon type states
  const [photoType, setPhotoType] = useState<"url" | "upload">(
    initialData?.photoType || "url",
  );
  const [iconType, setIconType] = useState<"url" | "upload" | "emoji">(
    initialData?.iconType || "emoji",
  );

  const [formData, setFormData] = useState<ServiceFormData>({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",

    // Photo
    photoType: initialData?.photoType || "url",
    photoUrl: initialData?.photoUrl || "",
    photoFile: initialData?.photoFile || undefined,

    // Icon
    iconType: initialData?.iconType || "emoji",
    icon: initialData?.icon || "⚡",
    iconUrl: initialData?.iconUrl || "",
    iconFile: initialData?.iconFile || undefined,

    features: initialData?.features || [],
    benefits: initialData?.benefits || [],
    pricing: initialData?.pricing || "",
    duration: initialData?.duration || "",
    deliverables: initialData?.deliverables || [],
  });

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim())
          newErrors.title = "Service title is required";
        if (!formData.subtitle.trim())
          newErrors.subtitle = "Subtitle is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.description.trim())
          newErrors.description = "Short description is required";
        break;
      case 2:
        // Photo validation
        if (photoType === "url" && !formData.photoUrl.trim()) {
          newErrors.photo = "Photo URL is required";
        } else if (photoType === "upload" && !formData.photoFile) {
          newErrors.photo = "Please upload a photo";
        }

        // Icon validation
        if (iconType === "url" && !formData.iconUrl.trim()) {
          newErrors.icon = "Icon URL is required";
        } else if (iconType === "upload" && !formData.iconFile) {
          newErrors.icon = "Please upload an icon";
        }
        break;
      case 3:
        if (formData.features.length === 0)
          newErrors.features = "Add at least one feature";
        if (!formData.longDescription.trim())
          newErrors.longDescription = "Detailed description is required";
        break;
      case 4:
        if (!formData.pricing.trim()) newErrors.pricing = "Pricing is required";
        if (!formData.duration.trim())
          newErrors.duration = "Duration is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (
    onSubmit: (data: Omit<Service, "id" | "active">) => void,
  ) => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        onSubmit({
          ...formData,
          photoType,
          iconType,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    errors,
    formData,
    photoType,
    iconType,
    setFormData,
    setPhotoType,
    setIconType,
    handleNext,
    handlePrevious,
    validateStep,
  };
}
