import {
  BasicInfoStep,
  PhotoStep,
  StatisticsStep,
  AdditionalInfoStep,
} from "./steps";
import type { FormStepsProps } from "./types";

export function FormSteps({
  currentStep,
  formData,
  imageType,
  errors,
  isDark,
  setField,
  setImageField,
  setImageType,
  clearError,
  handleImageFileChange,
  addHobby,
  removeHobby,
  addLanguage,
  removeLanguage,
}: FormStepsProps) {
  const handleImageTypeChange = (type: "url" | "file") => {
    setImageType(type);
    clearError("image");
  };
  const handleSocialChange = (field: string, value: string) =>
    setField(field as keyof typeof formData, value);

  switch (currentStep) {
    case 1:
      return (
        <BasicInfoStep
          formData={{
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }}
          errors={{
            name: errors.name,
            email: errors.email,
            phoneNumber: errors.phoneNumber,
          }}
          isDark={isDark}
          onChange={(field, value) =>
            setField(field as "name" | "email" | "phoneNumber", value)
          }
        />
      );
    case 2:
      return (
        <PhotoStep
          formData={{ image: formData.image }}
          imageType={imageType}
          error={errors.image}
          isDark={isDark}
          onImageTypeChange={handleImageTypeChange}
          onUrlChange={(url) => setImageField("url", url)}
          onFileChange={handleImageFileChange}
        />
      );
    case 3:
      return (
        <StatisticsStep
          formData={{
            experience: formData.experience,
            completedProjects: formData.completedProjects,
            solvedProblems: formData.solvedProblems,
            happyClients: formData.happyClients,
          }}
          errors={{
            experience: errors.experience,
            completedProjects: errors.completedProjects,
            solvedProblems: errors.solvedProblems,
            happyClients: errors.happyClients,
          }}
          isDark={isDark}
          onChange={(field, value) =>
            setField(
              field as
                | "experience"
                | "completedProjects"
                | "solvedProblems"
                | "happyClients",
              value,
            )
          }
        />
      );
    case 4:
      return (
        <AdditionalInfoStep
          formData={{
            InstagramURL: formData.InstagramURL,
            LinkedInURL: formData.LinkedInURL,
            GitHubURL: formData.GitHubURL,
            hobbies: formData.hobbies,
            languages: formData.languages,
          }}
          isDark={isDark}
          onSocialChange={handleSocialChange}
          onAddHobby={addHobby}
          onRemoveHobby={removeHobby}
          onAddLanguage={addLanguage}
          onRemoveLanguage={removeLanguage}
        />
      );
    default:
      return null;
  }
}
