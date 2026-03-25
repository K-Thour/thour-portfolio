import { BasicInfoStep } from "./steps/BasicInfoStep";
import { MediaStep } from "./steps/MediaStep";
import { FeaturesStep } from "./steps/FeaturesStep";
import { DetailsStep } from "./steps/DetailsStep";
import type { ServiceFormData } from "../types";

interface StepRendererProps {
  currentStep: number;
  formData: ServiceFormData;
  errors: Record<string, string>;
  photoType: "url" | "upload";
  iconType: "url" | "upload" | "emoji";
  categories: string[];
  emojiOptions: string[];
  onFormDataChange: (data: Partial<ServiceFormData>) => void;
  onPhotoTypeChange: (type: "url" | "upload") => void;
  onIconTypeChange: (type: "url" | "upload" | "emoji") => void;
  onPhotoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddArrayItem: (field: "features" | "benefits" | "deliverables") => void;
  onRemoveArrayItem: (
    field: "features" | "benefits" | "deliverables",
    index: number,
  ) => void;
}

export function StepRenderer({
  currentStep,
  formData,
  errors,
  photoType,
  iconType,
  categories,
  emojiOptions,
  onFormDataChange,
  onPhotoTypeChange,
  onIconTypeChange,
  onPhotoFileChange,
  onIconFileChange,
  onAddArrayItem,
  onRemoveArrayItem,
}: StepRendererProps) {
  switch (currentStep) {
    case 1:
      return (
        <BasicInfoStep
          formData={formData}
          errors={errors}
          categories={categories}
          onFormDataChange={onFormDataChange}
        />
      );
    case 2:
      return (
        <MediaStep
          formData={formData}
          errors={errors}
          photoType={photoType}
          iconType={iconType}
          emojiOptions={emojiOptions}
          onPhotoTypeChange={onPhotoTypeChange}
          onIconTypeChange={onIconTypeChange}
          onFormDataChange={onFormDataChange}
          onPhotoFileChange={onPhotoFileChange}
          onIconFileChange={onIconFileChange}
        />
      );
    case 3:
      return (
        <FeaturesStep
          formData={formData}
          errors={errors}
          onFormDataChange={onFormDataChange}
          onAddArrayItem={onAddArrayItem}
          onRemoveArrayItem={onRemoveArrayItem}
        />
      );
    case 4:
      return (
        <DetailsStep
          formData={formData}
          errors={errors}
          onFormDataChange={onFormDataChange}
          onAddArrayItem={onAddArrayItem}
          onRemoveArrayItem={onRemoveArrayItem}
        />
      );
    default:
      return null;
  }
}
