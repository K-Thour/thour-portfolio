import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { useShareProjects } from "./hooks/useShareProjects";
import { copyToClipboard } from "./utils/clipboard";
import { PortfolioHeader, PortfolioList, PortfolioModal } from "./components";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import { useToast } from "../../../hooks/useToast";
import { fetchCurrentUser } from "../../../services/api";

function ShareProjectsPortfolio() {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";
  const { toast } = useToast();
  const [userName, setUserName] = useState("User");
  const {
    portfolios,
    allProjects,
    isModalOpen,
    editingPortfolio,
    formData,
    copiedId,
    openModal,
    closeModal,
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
  } = useShareProjects();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUserName(data?.name || data?.username || "User");
      } catch {
        setUserName("User");
      }
    };

    void loadUser();
  }, []);

  const handleCopy = (url: string, id: string) => {
    copyToClipboard(
      url,
      () => {
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
      },
      () =>
        toast({
          title: "Copy Link",
          description: `Copy this link: ${url}`,
          variant: "warning",
        }),
    );
  };

  return (
    <div className="space-y-6 overflow-hidden">
      <PortfolioHeader
        isDark={isDark}
        userName={userName}
        onAdd={() => openModal()}
      />
      <PortfolioList
        portfolios={portfolios}
        allProjects={allProjects}
        isDark={isDark}
        copiedId={copiedId}
        onEdit={openModal}
        onDelete={deletePortfolio}
        onCopy={handleCopy}
      />
      <PortfolioModal
        isOpen={isModalOpen}
        isDark={isDark}
        editingPortfolio={editingPortfolio}
        formData={formData}
        allProjects={allProjects}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onNameChange={(name) => setFormData((prev) => ({ ...prev, name }))}
        onToggleProject={toggleProject}
      />
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onConfirm={() => {
          if (portfolioToDelete) {
            removePortfolio(portfolioToDelete);
            setDeleteConfirmOpen(false);
            setPortfolioToDelete(null);
          }
        }}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setPortfolioToDelete(null);
        }}
        title="Delete Portfolio"
        message="Are you sure you want to delete this portfolio?"
      />
    </div>
  );
}

export default ShareProjectsPortfolio;
