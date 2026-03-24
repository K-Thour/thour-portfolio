import React from "react";
import { ExperienceFormWizard } from "./experienceWizard/ExperienceFormWizard";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import type { ExperienceFormData } from "../../../validations/experienceSchema";
import type { Experience } from "./experienceCard/ExperienceCard";

interface ExperienceModalsProps {
  isWizardOpen: boolean;
  deleteModalOpen: boolean;
  isDeleting: boolean;
  isDark: boolean;
  editingId: string | null;
  editingExperience: Experience | null;
  onCloseWizard: () => void;
  onSubmitExperience: (data: ExperienceFormData) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

export const ExperienceModals: React.FC<ExperienceModalsProps> = ({
  isWizardOpen,
  deleteModalOpen,
  isDeleting,
  isDark,
  editingId,
  editingExperience,
  onCloseWizard,
  onSubmitExperience,
  onCancelDelete,
  onConfirmDelete,
}) => {
  return (
    <>
      <ExperienceFormWizard
        isOpen={isWizardOpen}
        onClose={onCloseWizard}
        onSubmit={onSubmitExperience}
        initialData={editingExperience || undefined}
        isDark={isDark}
        isEditing={!!editingId}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        loading={isDeleting}
        isDark={isDark}
      />
    </>
  );
};

export default ExperienceModals;
