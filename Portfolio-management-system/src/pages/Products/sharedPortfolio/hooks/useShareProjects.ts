import { useEffect } from "react";
import { allProjects } from "../data/sharedProjectsData";
import { usePortfolioState } from "./usePortfolioState";
import { usePortfolioModal } from "./usePortfolioModal";
import { useClipboard } from "./useClipboard";
import { useToast } from "../../../../hooks/useToast";

export { allProjects };

export function useShareProjects() {
  const { toast } = useToast();
  const {
    portfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    loadPortfolios,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    portfolioToDelete,
    setPortfolioToDelete,
    removePortfolio,
  } = usePortfolioState();
  const { isOpen, editing, formData, open, close, setFormData, toggleProject } =
    usePortfolioModal();
  const { copiedId, setCopied } = useClipboard();

  useEffect(() => {
    loadPortfolios(
      JSON.parse(localStorage.getItem("shared-portfolios") || "[]"),
    );
  }, [loadPortfolios]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.projectIds.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please enter name and select projects",
        variant: "destructive",
      });
      return;
    }

    if (editing) {
      updatePortfolio(editing.id, {
        name: formData.name,
        projectIds: formData.projectIds,
      });
    } else {
      const token = Math.random().toString(36).substring(2, 15);
      addPortfolio({
        id: token,
        name: formData.name,
        projectIds: formData.projectIds,
        url: `${window.location.origin}/portfolio/${token}`,
        createdAt: new Date().toISOString(),
      });
    }
    close();
  };

  return {
    portfolios,
    allProjects,
    isModalOpen: isOpen,
    editingPortfolio: editing,
    formData,
    copiedId,
    openModal: open,
    closeModal: close,
    handleSubmit,
    toggleProject,
    deletePortfolio,
    setFormData,
    setCopied,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    portfolioToDelete,
    setPortfolioToDelete,
    removePortfolio,
  };
}
