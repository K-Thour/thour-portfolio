import { Modal } from "../../../../components/ui/model/Model";
import ConfirmModal from "../../../../components/common/confirmModel/confirmModel";
import { EducationForm } from "./EducationForm";
import type { EducationModalsProps } from "../types";

export function EducationModals({
  isModalOpen,
  isDeleteModalOpen,
  editingEducation,
  onCloseModal,
  onCloseDeleteModal,
  onSubmit,
  onConfirmDelete,
}: EducationModalsProps) {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={editingEducation ? "Edit Education" : "Add Education"}
        size="lg"
      >
        <EducationForm
          onSubmit={onSubmit}
          onCancel={onCloseModal}
          initialData={editingEducation}
        />
      </Modal>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={onConfirmDelete}
        onCancel={onCloseDeleteModal}
        title="Delete Education"
        message="Are you sure you want to delete this education? This action cannot be undone."
      />
    </>
  );
}
