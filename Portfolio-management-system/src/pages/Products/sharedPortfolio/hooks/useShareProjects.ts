import { useState, useEffect, useCallback } from "react";
import { usePortfolioModal } from "./usePortfolioModal";
import { useClipboard } from "./useClipboard";
import { useToast } from "../../../../hooks/useToast";
import {
  fetchProjects,
  fetchPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../../../../services/api";
import type { Project, Portfolio } from "../types";
import { buildPortfolioPublicUrl } from "../../../PublicPortfolio/OverviewPage/utils/portfolioUrl";

export function useShareProjects() {
  const { toast } = useToast();

  // ─── Projects from API ─────────────────────────────────────────────────────
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const data = await fetchProjects();
        const mapped: Project[] = (data || [])
          .filter((p: any) => p.isActive !== false && !p.isDeleted)
          .map((p: any) => ({
            id: p._id,
            title: p.title || "Untitled",
            category:
              typeof p.category === "object"
                ? p.category?.name || "Uncategorized"
                : p.category || "Uncategorized",
            image: p.image?.url || "",
          }));
        setAllProjects(mapped);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        toast({
          title: "Error",
          description: "Could not load projects from server.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProjects(false);
      }
    };
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Portfolios from API ───────────────────────────────────────────────────
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(
    null,
  );

  const loadPortfolios = useCallback(async () => {
    setIsLoadingPortfolios(true);
    try {
      const data = await fetchPortfolios();
      const mapped: Portfolio[] = (data || []).map((p: any) => ({
        id: p._id,
        name: p.name,
        projectIds: (p.project || p.projects || p.projectIds || []).map(
          (id: any) =>
            typeof id === "object" ? id._id || String(id) : String(id),
        ),
        url: p.url || buildPortfolioPublicUrl(window.location.origin, p._id),
        createdAt: p.createdAt || new Date().toISOString(),
      }));
      setPortfolios(mapped);
    } catch (err) {
      console.error("Failed to load portfolios:", err);
    } finally {
      setIsLoadingPortfolios(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  // ─── Modal ─────────────────────────────────────────────────────────────────
  const { isOpen, editing, formData, open, close, setFormData, toggleProject } =
    usePortfolioModal();

  const { copiedId, setCopied } = useClipboard();

  // ─── Submit (create or update) ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.projectIds.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a name and select at least one project.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingPortfolios(true);
    try {
      if (editing) {
        await updatePortfolio(editing.id, {
          name: formData.name,
          projects: formData.projectIds,
        });
        toast({
          title: "Portfolio Updated",
          description: `"${formData.name}" has been updated.`,
          variant: "success",
        });
      } else {
        await createPortfolio({
          name: formData.name,
          projects: formData.projectIds,
        });
        toast({
          title: "Portfolio Created",
          description: `"${formData.name}" has been created successfully.`,
          variant: "success",
        });
      }
      await loadPortfolios();
      close();
    } catch (err) {
      console.error("Failed to save portfolio:", err);
      toast({
        title: "Save Failed",
        description: "Could not save portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPortfolios(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────────────────────
  const deletePortfolioById = (id: string) => {
    setPortfolioToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const removePortfolio = useCallback(
    async (id: string) => {
      setIsLoadingPortfolios(true);
      try {
        await deletePortfolio(id);
        await loadPortfolios();
        toast({
          title: "Portfolio Deleted",
          description: "The portfolio has been removed.",
          variant: "warning",
        });
      } catch (err) {
        console.error("Failed to delete portfolio:", err);
        toast({
          title: "Delete Failed",
          description: "Could not delete portfolio. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPortfolios(false);
      }
    },
    [loadPortfolios, toast],
  );

  return {
    portfolios,
    allProjects,
    isLoadingProjects,
    isLoadingPortfolios,
    isModalOpen: isOpen,
    editingPortfolio: editing,
    formData,
    copiedId,
    openModal: open,
    closeModal: close,
    handleSubmit,
    toggleProject,
    deletePortfolio: deletePortfolioById,
    setFormData,
    setCopied,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    portfolioToDelete,
    setPortfolioToDelete,
    removePortfolio,
  };
}
