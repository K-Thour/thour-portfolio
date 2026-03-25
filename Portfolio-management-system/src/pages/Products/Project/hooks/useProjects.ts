import { useState } from "react";
import type { Project, ProjectFormData } from "../components/types";
import { projectData } from "../components/data/projectData";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(projectData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...data, id: editingProject.id, views: editingProject.views }
            : p,
        ),
      );
    } else {
      setProjects([...projects, { ...data, id: Date.now(), views: 0 }]);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setProjects(projects.filter((s) => s.id !== deletingId));
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleDelete = (id: number) => {
    handleDeleteClick(id);
  };

  const handleView = (project: Project) => {
    window.open(project.liveUrl, "_blank");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  };

  return {
    projects,
    isModalOpen,
    editingProject,
    isDeleteDialogOpen,
    deletingId,
    handlers: {
      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
      handleView,
      handleCloseModal,
      handleDeleteConfirm,
      handleDeleteClick,
      handleDeleteCancel,
    },
  };
}
