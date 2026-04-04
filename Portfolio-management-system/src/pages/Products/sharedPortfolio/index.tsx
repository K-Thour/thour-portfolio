import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { useShareProjects, allProjects } from "./hooks/useShareProjects";
import { copyToClipboard } from "./utils/clipboard";
import { PortfolioHeader, PortfolioList, PortfolioModal } from "./components";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";

function ShareProjectsPortfolio() {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";
  const {
    portfolios,
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

  const handleCopy = (url: string, id: string) => {
    copyToClipboard(
      url,
      () => {
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
      },
      () => alert(`Copy this link: ${url}`),
    );
  };

  return (
    <div className="space-y-6 overflow-hidden">
      <PortfolioHeader isDark={isDark} onAdd={() => openModal()} />
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
