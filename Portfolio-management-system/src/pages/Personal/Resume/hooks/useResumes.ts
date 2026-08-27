import { useState, useCallback } from "react";
import { useResumeForm } from "./useResumeForm";
import { useResumeOperations } from "./useResumeOperations";
import { useTaskQueue } from "../../../../hooks/useTaskQueue";
import type { Resume, ResumeFormData } from "../types";

export function useResumes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const { formData, resetForm } = useResumeForm();
  const { enqueueResumeGeneration } = useTaskQueue();
  const {
    resumes,
    loading,
    deletingId,
    togglingActiveId,
    toggleResumeDeleting,
    addResume,
    refreshResumes,
    deleteResume,
    downloadResume,
    toggleActiveResume,
  } = useResumeOperations();

  const open = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const close = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  const submit = useCallback(
    async (data?: ResumeFormData) => {
      const payload = data || formData;
      if (!payload.name?.trim()) return;

      // 1. Immediately close the modal without blocking UI
      close();

      // 2. Enqueue in the universal background task manager
      try {
        await enqueueResumeGeneration(payload, (createdResume) => {
          if (createdResume) {
            addResume(createdResume);
          } else {
            refreshResumes();
          }
        });
      } catch (err) {
        console.error("Background task error:", err);
      }
    },
    [formData, enqueueResumeGeneration, close, addResume, refreshResumes],
  );

  const regenerate = useCallback(
    async (resume: Resume) => {
      const payload: ResumeFormData = {
        name: resume.name,
        description: resume.description || "",
        jobLink: resume.jobLink || "",
        targetRole: resume.targetRole,
        selectedProjectIds: resume.selectedProjectIds,
        selectedExperienceIds: resume.selectedExperienceIds,
        designType: resume.designType || "ats",
        latexCode: resume.latexCode,
        designUrl: resume.designUrl,
      };

      setRegeneratingId(resume.id);
      try {
        await enqueueResumeGeneration(payload, (createdResume) => {
          setRegeneratingId(null);
          if (createdResume) {
            addResume(createdResume);
          } else {
            refreshResumes();
          }
        });
      } catch (err) {
        setRegeneratingId(null);
        console.error("Background task error:", err);
      }
    },
    [enqueueResumeGeneration, addResume, refreshResumes],
  );

  return {
    resumes,
    loading,
    isModalOpen,
    deletingId,
    regeneratingId,
    togglingActiveId,
    toggleResumeDeleting,
    handlers: {
      handleOpenModal: open,
      handleCloseModal: close,
      handleSubmit: submit,
      handleDelete: deleteResume,
      handleDownload: downloadResume,
      handleRegenerate: regenerate,
      handleToggleActive: toggleActiveResume,
    },
  };
}

export default useResumes;
