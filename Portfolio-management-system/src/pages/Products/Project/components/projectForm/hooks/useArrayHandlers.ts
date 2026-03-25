import type { ProjectFormData } from "../../types";

export function useArrayHandlers(
  formData: ProjectFormData,
  setFormData: (data: Partial<ProjectFormData>) => void,
) {
  const addArrayItem = (field: "technologies" | "features", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
    }
  };

  const removeArrayItem = (
    field: "technologies" | "features",
    index: number,
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_: string, i: number) => i !== index),
    });
  };

  return {
    addArrayItem,
    removeArrayItem,
  };
}
