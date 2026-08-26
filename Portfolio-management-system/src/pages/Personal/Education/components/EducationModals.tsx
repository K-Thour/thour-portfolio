import { Modal } from "../../../../components/ui/model/Model";
import ConfirmModal from "../../../../components/common/confirmModel/confirmModel";
import { EducationForm } from "./EducationForm";
import type { EducationModalsProps } from "../types";

export function EducationModals({
  isModalOpen,
  isDeleteModalOpen,
  editingEducation,
  isLoading = false,
  onCloseModal,
  onCloseDeleteModal,
  onSubmit,
  onConfirmDelete,
}: EducationModalsProps) {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={isLoading ? () => {} : onCloseModal}
        title={editingEducation ? "Edit Education" : "Add Education"}
        size="lg"
      >
        <EducationForm
          onSubmit={onSubmit}
          onCancel={onCloseModal}
          initialData={editingEducation}
          isLoading={isLoading}
        />
      </Modal>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        isLoading={isLoading}
        loadingText="Deleting..."
        onConfirm={onConfirmDelete}
        onCancel={onCloseDeleteModal}
        title="Delete Education"
        message="Are you sure you want to delete this education? This action cannot be undone."
      />
    </>
  );
}
