import type { ProjectModalProps } from "./types";
import { ProjectFormWizard } from "./ProjectFormWizard";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";

export function ProjectModal({
  isOpen,
  onClose,
  editingProject,
  onSubmit,
}: ProjectModalProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <ProjectFormWizard
      key={editingProject ? String(editingProject.id) : 'new'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={editingProject || undefined}
      isDark={isDark}
      isEditing={!!editingProject}
    />
  );
}

export default ProjectModal;
