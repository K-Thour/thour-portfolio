import type { ServiceFormData } from "../../types";

export function useFileHandlers(
  setFormData: (data: Partial<ServiceFormData>) => void,
) {
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ photoFile: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ iconFile: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    handlePhotoFileChange,
    handleIconFileChange,
  };
}
