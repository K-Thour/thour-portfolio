import type { PortfolioModalProps } from "../../types";
import utils from "../../../../../utils";
import { Modal } from "../../../../../components/ui/model/Model";
import { NameInput } from "./NameInput";
import { ProjectMultiSelect } from "./ProjectMultiSelect";
import { ModalActions } from "./ModalActions";
const { cn } = utils.tailwindUtils;

export function PortfolioModal({
  isOpen,
  isDark,
  editingPortfolio,
  formData,
  allProjects,
  onClose,
  onSubmit,
  onNameChange,
  onToggleProject,
}: PortfolioModalProps) {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}
      className={cn(
        "bg-black/60 backdrop-blur-sm",
        isDark ? "bg-slate-900/80" : "bg-black/50",
      )}
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
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}
