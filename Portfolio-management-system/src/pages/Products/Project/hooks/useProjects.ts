import { useState, useEffect } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../../../services/api";
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
        id: p._id,
        title: p.title || "",
        subtitle: p.device || "web",
        category: p.category?._id || p.category || "",
        description: p.description || "",
        longDescription: p.fullDescription || "",
        image: p.image?.url || "",
        technologies: p.techStack?.map((t: any) => t.name || t) || [],
        features: p.features || [],
        github: p.githubUrl || "",
        liveUrl: p.workingUrl || "",
        status: p.isActive ? "Completed" : "In Progress",
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
    const normalizedDevice = ["web", "mobile", "desktop"].includes(
      (data.subtitle || "").toLowerCase(),
    )
      ? (data.subtitle || "").toLowerCase()
      : "web";

    const payload = {
      title: data.title,
      category: data.category,
      description: data.description,
      image: {
        publicId: "project-main",
        url: data.image || "https://placehold.co/600",
      },
      device: normalizedDevice,
      year: new Date().getFullYear(),
      client: "Personal",
      fullDescription: data.longDescription || data.description,
      role: "Developer",
      outcome: "Completed successfully",
      workingUrl: data.liveUrl || "https://example.com",
      githubUrl: data.github || "https://github.com",
      screenshots: [],
      projectMetric: [],
      projectTestimonial: [],
      techStack: data.technologies || [],
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
        toast({
          title: "Project Updated",
          description: `Successfully updated ${data.title}`,
          variant: "success",
          duration: 3000,
        });
      } else {
        await createProject(payload);
        toast({
          title: "Project Created",
          description: `Successfully created ${data.title}`,
          variant: "success",
          duration: 3000,
        });
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
        duration: 3000,
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
        toast({
          title: "Project Deleted",
          description: "Successfully deleted project record.",
          variant: "warning",
          duration: 3000,
        });
        await loadProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
        toast({
          title: "Delete Failed",
          description: "Error deleting project. Check console.",
          variant: "destructive",
          duration: 3000,
        });
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
