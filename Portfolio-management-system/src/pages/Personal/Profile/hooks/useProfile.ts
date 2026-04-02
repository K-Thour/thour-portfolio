import { useState } from "react";
import type { ProfileData } from "../types";
import { initialProfileData } from "../data/initialData";

export function useProfile() {
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ProfileData) => {
    setProfileData(data);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    // Navigate back to previous page or home
    window.history.back();
  };

  return {
    profileData,
    isModalOpen,
    handlers: {
      handleEdit,
      handleSubmit,
      handleCloseModal,
      handleBack,
    },
  };
}
