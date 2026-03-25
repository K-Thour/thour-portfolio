import type { ServiceFormData } from "../../types";

export function useArrayHandlers(
  formData: ServiceFormData,
  setFormData: (data: Partial<ServiceFormData>) => void,
) {
  const addArrayItem = (field: "features" | "benefits" | "deliverables") => {
    const input = document.getElementById(`${field}-input`) as HTMLInputElement;
    if (input && input.value.trim()) {
      setFormData({
        [field]: [...formData[field], input.value.trim()],
      });
      input.value = "";
    }
  };

  const removeArrayItem = (
    field: "features" | "benefits" | "deliverables",
    index: number,
  ) => {
    setFormData({
      [field]: formData[field].filter((_: string, i: number) => i !== index),
    });
  };

  return {
    addArrayItem,
    removeArrayItem,
  };
}
