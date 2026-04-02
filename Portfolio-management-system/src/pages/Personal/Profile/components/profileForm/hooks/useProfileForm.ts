import { useState } from "react";
import type { ProfileFormData, ProfileFormErrors } from "../types";
import { initialFormData } from "../../../data/initialFormData";

export function useProfileForm(initialData?: Partial<ProfileFormData>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [imageType, setImageType] = useState<"url" | "file">(
    initialData?.image?.type || "url",
  );
  const [formData, setFormData] = useState<ProfileFormData>(
    initialFormData(initialData),
  );

  const setField = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const setImageField = (field: "url" | "file", value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  const setNumberField = (
    field: keyof Omit<
      ProfileFormData,
      | "image"
      | "hobbies"
      | "languages"
      | "name"
      | "email"
      | "phoneNumber"
      | "InstagramURL"
      | "LinkedInURL"
      | "GitHubURL"
    >,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const clearError = (field: keyof ProfileFormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ProfileFormErrors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Phone number is required";
        break;
      case 2:
        if (imageType === "url" && !formData.image.url.trim()) {
          newErrors.image = "Image URL is required";
        } else if (imageType === "file" && !formData.image.file) {
          newErrors.image = "Please upload an image";
        }
        break;
      case 3:
        if (formData.experience < 0)
          newErrors.experience = "Experience cannot be negative";
        if (formData.completedProjects < 0)
          newErrors.completedProjects = "Projects cannot be negative";
        if (formData.solvedProblems < 0)
          newErrors.solvedProblems = "Problems cannot be negative";
        if (formData.happyClients < 0)
          newErrors.happyClients = "Clients cannot be negative";
        break;
      case 4:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: { ...prev.image, file: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addHobby = (value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, value.trim()],
      }));
    }
  };

  const removeHobby = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = (name: string, proficiency: number) => {
    if (name.trim()) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, { name: name.trim(), proficiency }],
      }));
    }
  };

  const removeLanguage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const goToNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getSubmitData = () => ({
    ...formData,
    image: {
      type: imageType,
      url: imageType === "url" ? formData.image.url : "",
      file: imageType === "file" ? formData.image.file : null,
    },
  });

  return {
    currentStep,
    errors,
    imageType,
    formData,
    setImageType,
    setField,
    setImageField,
    setNumberField,
    clearError,
    validateStep,
    handleImageFileChange,
    addHobby,
    removeHobby,
    addLanguage,
    removeLanguage,
    goToNext,
    goToPrevious,
    getSubmitData,
  };
}
