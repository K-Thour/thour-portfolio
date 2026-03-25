import type { Service } from "../../../types";

export const getFormData = (initialData?: Service) => ({
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
