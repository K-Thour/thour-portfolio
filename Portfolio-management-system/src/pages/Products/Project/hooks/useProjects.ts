import { useState, useEffect } from "react";
import type { Project, ProjectFormData } from "../components/types";
import { fetchProjects, createProject, updateProject, deleteProject } from "../../../../../services/api";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjects();
      const mappedData = data.map((p: any) => ({
        ...p,
        id: p._id,
        liveUrl: p.workingUrl,
        githubUrl: p.githubUrl,
      }));
      setProjects(mappedData);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
      } else {
        await createProject(data);
      }
      await loadProjects(); // Refresh data
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Error saving project. Check console.");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      try {
        await deleteProject(deletingId);
        await loadProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
      } finally {
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      }
    }
  };

  const handleDelete = (id: string) => {
    handleDeleteClick(id);
  };

  const handleView = (project: any) => {
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
    isLoading,
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
