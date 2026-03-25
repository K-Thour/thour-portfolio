import { Modal } from "../../../../components/ui/model/Model";
import { ProjectForm } from "./projectForm/ProjectForm";
import type { ProjectModalProps } from "./types";

export function ProjectModal({
  isOpen,
  onClose,
  editingProject,
  onSubmit,
}: ProjectModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProject ? "Edit Project" : "Add New Project"}
      size="lg"
    >
      <ProjectForm
        onSubmit={onSubmit}
        onCancel={onClose}
        initialData={editingProject || undefined}
      />
    </Modal>
  );
}
