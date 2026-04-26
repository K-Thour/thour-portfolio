import { useAppSelector } from "../../../hooks/useRedux";
import { useResumePage } from "./hooks/useResumePage";
import { ResumeHeader } from "./components/ResumeHeader";
import { ResumeList } from "./components/ResumeList";
import { EmptyResumeState } from "./components/EmptyResumeState";
import { ResumeModal } from "./components/ResumeModal";
import Footer from "../../../layouts/footer/Footer";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import { useResumeOperations } from "./hooks/useResumeOperations";

export function ResumePage() {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const { resumes, isModalOpen, handlers } = useResumePage();
  const { deletingId, toggleResumeDeleting } = useResumeOperations();

  const onConfirmDelete = () => {
    if (deletingId) {
      handlers.handleDelete(deletingId);
    }
    toggleResumeDeleting(deletingId as string);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="flex-1 p-6">
        <ResumeHeader isDark={isDark} onAddResume={handlers.handleOpenModal} />
        <div className="mt-6">
          {resumes.length === 0 ? (
            <EmptyResumeState
              isDark={isDark}
              onAddResume={handlers.handleOpenModal}
            />
          ) : (
            <ResumeList
              resumes={resumes}
              isDark={isDark}
              onDownload={handlers.handleDownload}
              onDelete={toggleResumeDeleting}
            />
          )}
        </div>
      </div>
      <ResumeModal
        isOpen={isModalOpen}
        onClose={handlers.handleCloseModal}
        onSubmit={handlers.handleSubmit}
      />
      <Footer />
      <ConfirmModal
        isOpen={deletingId !== null}
        onConfirm={onConfirmDelete}
        onCancel={() => toggleResumeDeleting(deletingId as string)}
        title="Delete Resume"
        message="Are you sure you want to delete this resume?"
      />
    </div>
  );
}

export default ResumePage;
