import { useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { useResumePage } from "./hooks/useResumePage";
import { ResumeHeader } from "./components/ResumeHeader";
import { ResumeList } from "./components/ResumeList";
import { EmptyResumeState } from "./components/EmptyResumeState";
import { ResumeModal } from "./components/ResumeModal";
import Footer from "../../../layouts/footer/Footer";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import ConfirmDownloadModal, {
  type DownloadFormat,
} from "../../../components/common/confirmModel/ConfirmDownloadModal";
import { useResumeOperations } from "./hooks/useResumeOperations";
import type { Resume } from "./types";

export function ResumePage() {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const { resumes, isModalOpen, handlers } = useResumePage();
  const { deletingId, toggleResumeDeleting } = useResumeOperations();

  // Download modal state
  const [downloadResume, setDownloadResume] = useState<Resume | null>(null);

  const onConfirmDelete = () => {
    if (deletingId) {
      handlers.handleDelete(deletingId);
    }
    toggleResumeDeleting(deletingId as string);
  };

  // Handle download click - show modal instead of direct download
  const handleDownloadClick = (resume: Resume) => {
    setDownloadResume(resume);
  };

  // Handle confirmed download with selected format
  const handleConfirmDownload = (format: DownloadFormat) => {
    if (downloadResume) {
      console.log(`Downloading ${downloadResume.name} as ${format}`);
      // TODO: Implement actual download logic based on format
      // For now, call the existing handler
      handlers.handleDownload(downloadResume);
    }
    setDownloadResume(null);
  };

  const handleCancelDownload = () => {
    setDownloadResume(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="flex-1 p-6">
        <ResumeHeader
          isDark={isDark}
          onAddResume={handlers.handleOpenModal}
          resumeLimit={resumes.length}
        />
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
              onDownload={handleDownloadClick}
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
      <ConfirmDownloadModal
        isOpen={downloadResume !== null}
        onConfirm={handleConfirmDownload}
        onCancel={handleCancelDownload}
        title="Download Resume"
        fileName={
          downloadResume?.name ? `${downloadResume.name}.pdf` : "resume.pdf"
        }
        previewData={{
          name: downloadResume?.name,
          summary: downloadResume?.description,
        }}
      />
    </div>
  );
}

export default ResumePage;
