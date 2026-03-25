import { useProjects } from "./hooks/useProjects";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectList } from "./components/ProjectList";
import { ProjectModal } from "./components/ProjectModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../hooks/useRedux";

function ProjectPage() {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const {
    projects,
    isModalOpen,
    editingProject,
    handlers,
    isDeleteDialogOpen,
  } = useProjects();

  return (
    <div className="space-y-6">
      <ProjectHeader onAdd={handlers.handleAdd} />

      <ProjectList
        projects={projects}
        onEdit={handlers.handleEdit}
        onDelete={handlers.handleDelete}
        onView={handlers.handleView}
      />

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handlers.handleCloseModal}
        editingProject={editingProject}
        onSubmit={handlers.handleSubmit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteDialogOpen}
        onConfirm={handlers.handleDeleteConfirm}
        onCancel={handlers.handleDeleteCancel}
        isDark={isDark}
      />
    </div>
  );
}

export default ProjectPage;
