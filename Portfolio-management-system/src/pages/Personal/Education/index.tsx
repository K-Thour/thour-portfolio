import { motion } from "motion/react";
import { EducationHeader } from "./components/EducationHeader";
import { EducationTimeline } from "./components/EducationTimeline";
import { EducationModals } from "./components/EducationModals";
import { useEducation } from "./hooks/useEducation";

function EducationPage() {
  const {
    educationList,
    isModalOpen,
    editingEducation,
    isDeleteDialogOpen,
    handlers,
  } = useEducation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <EducationHeader onAdd={handlers.handleAdd} />

      <EducationTimeline
        educationList={educationList}
        onEdit={handlers.handleEdit}
        onDelete={handlers.handleDeleteClick}
      />

      <EducationModals
        isModalOpen={isModalOpen}
        isDeleteModalOpen={isDeleteDialogOpen}
        editingEducation={editingEducation}
        onCloseModal={handlers.handleCloseModal}
        onCloseDeleteModal={handlers.handleDeleteCancel}
        onSubmit={handlers.handleSubmit}
        onConfirmDelete={handlers.handleDeleteConfirm}
      />
    </motion.div>
  );
}

export default EducationPage;
