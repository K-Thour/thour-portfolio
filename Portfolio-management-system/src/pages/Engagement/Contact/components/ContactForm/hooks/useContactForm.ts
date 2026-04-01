import { useState, useCallback } from "react";
import type { Contact, ContactFormData } from "../../../types";

const initialFormState: ContactFormData = {
  label: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  website: "",
  linkedin: "",
  github: "",
  twitter: "",
  instagram: "",
  facebook: "",
  youtube: "",
  availability: "",
  timezone: "",
};

export function useContactForm(initialData?: Contact | null) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    label: initialData?.label || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "",
    zipCode: initialData?.zipCode || "",
    website: initialData?.website || "",
    linkedin: initialData?.linkedin || "",
    github: initialData?.github || "",
    twitter: initialData?.twitter || "",
    instagram: initialData?.instagram || "",
    facebook: initialData?.facebook || "",
    youtube: initialData?.youtube || "",
    availability: initialData?.availability || "",
    timezone: initialData?.timezone || "",
  });

  const updateField = useCallback(
    <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
      setFormData((prev: ContactFormData) => ({ ...prev, [field]: value }));
      if (errors[field as string]) {
        setErrors((prev: Record<string, string>) => ({
          ...prev,
          [field as string]: "",
        }));
      }
    },
    [errors],
  );

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      switch (step) {
        case 1:
          if (!formData.label.trim())
            newErrors.label = "Contact label is required";
          if (!formData.email.trim()) {
            newErrors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
          }
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData],
  );

  const goToNext = useCallback(() => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, validateStep]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setErrors({});
    setFormData(initialFormState);
  }, []);

  return {
    currentStep,
    formData,
    errors,
    updateField,
    goToNext,
    goToPrevious,
    resetForm,
    setCurrentStep,
  };
}
