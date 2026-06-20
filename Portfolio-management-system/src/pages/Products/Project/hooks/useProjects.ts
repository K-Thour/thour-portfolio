import { useState, useEffect } from "react";
import { fetchProjects, createProject, updateProject, deleteProject } from "../../../../services/api";
import { useToast } from "../../../../hooks/useToast";

export function useProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

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
      toast({
        title: "Save Failed",
        description: "Error saving project. Check console.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      try {
        await deleteProject(deletingId.toString());
        await loadProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
      } finally {
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      }
    }
  };

  const handleDelete = (id: string | number) => {
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
