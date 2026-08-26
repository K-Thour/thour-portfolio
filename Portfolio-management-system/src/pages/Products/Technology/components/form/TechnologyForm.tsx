import { useState } from "react";
import { IconSelector } from "./IconSelector";
import { BasicInfoFields } from "./BasicInfoFields";
import { FormActions } from "./FormActions";
import type { Technology } from "../../types";

interface TechnologyFormProps {
  onSubmit: (data: Omit<Technology, "id">) => void;
  onCancel: () => void;
  initialData?: Technology;
  isLoading?: boolean;
}

export function TechnologyForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: TechnologyFormProps) {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [iconType, setIconType] = useState<"emoji" | "url" | "image">(
    initialData?.iconType || "emoji",
  );
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    icon: initialData?.icon || "⚛️",
    iconType: initialData?.iconType || "emoji",
    iconUrl: initialData?.iconUrl || "",
    iconImage: initialData?.iconImage || "",
  });

  const categories = [
    "Frontend",
    "Backend",
    "Language",
    "Framework",
    "Database",
    "Cloud & DevOps",
    "Mobile",
    "Testing",
    "Other",
  ];
  const iconOptions = [
    "⚛️",
    "📘",
    "🐍",
    "🟢",
    "⚡",
    "🔥",
    "🐘",
    "🐬",
    "🍃",
    "🐳",
    "☁️",
    "🦀",
    "☕",
    "🎯",
    "💎",
    "🚀",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";

    if (iconType === "emoji" && !formData.icon) {
      newErrors.icon = "Please select an emoji icon";
    } else if (iconType === "url" && !formData.iconUrl?.trim()) {
      newErrors.icon = "Please enter an image URL";
    } else if (iconType === "image" && !formData.iconImage) {
      newErrors.icon = "Please upload an image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const submitData = {
        ...formData,
        iconType,
      };
      onSubmit(submitData);
    }
  };

  const handleIconTypeChange = (type: "emoji" | "url" | "image") => {
    setIconType(type);
    setFormData({ ...formData, iconType: type });
    setErrors({ ...errors, icon: undefined });
  };

  return (
    <div className="space-y-6">
      <BasicInfoFields
        formData={{ name: formData.name, category: formData.category }}
        errors={errors}
        categories={categories}
        onFormDataChange={(data) => setFormData({ ...formData, ...data })}
      />

      <IconSelector
        iconType={iconType}
        formData={{
          icon: formData.icon,
          iconUrl: formData.iconUrl,
          iconImage: formData.iconImage,
        }}
        errors={errors}
        iconOptions={iconOptions}
        onIconTypeChange={handleIconTypeChange}
        onFormDataChange={(data) => setFormData({ ...formData, ...data })}
      />

      <FormActions
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isEditing={!!initialData}
        isLoading={isLoading}
      />
    </div>
  );
}
