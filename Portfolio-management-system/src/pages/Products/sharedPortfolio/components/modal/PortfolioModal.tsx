import type { PortfolioModalProps } from "../../types";
import { Modal } from "../../../../../components/ui/model/Model";
import { NameInput } from "./NameInput";
import { ProjectMultiSelect } from "./ProjectMultiSelect";
import { ModalActions } from "./ModalActions";

export function PortfolioModal({
  isOpen,
  isDark,
  editingPortfolio,
  formData,
  allProjects,
  isLoading = false,
  onClose,
  onSubmit,
  onNameChange,
  onToggleProject,
}: PortfolioModalProps) {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose}
      title={editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}
    >
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        <NameInput
          isDark={isDark}
          value={formData.name}
          onChange={onNameChange}
        />
        <ProjectMultiSelect
          isDark={isDark}
          projects={allProjects}
          selectedIds={formData.projectIds}
          onToggle={onToggleProject}
        />
        <ModalActions
          isDark={isDark}
          isEditing={!!editingPortfolio}
          isLoading={isLoading}
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}

