import { useState, useCallback } from "react";
import { useResumeForm } from "./useResumeForm";
import { useResumeOperations } from "./useResumeOperations";
import { useTaskQueue } from "../../../../hooks/useTaskQueue";
import type { ResumeFormData } from "../types";

export function useResumes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formData, resetForm } = useResumeForm();
  const { enqueueResumeGeneration } = useTaskQueue();
  const {
    resumes,
    loading,
    deletingId,
    toggleResumeDeleting,
    createResume,
    addResume,
    refreshResumes,
    deleteResume,
    downloadResume,
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

  return {
    resumes,
    loading,
    isModalOpen,
    deletingId,
    toggleResumeDeleting,
    handlers: {
      handleOpenModal: open,
      handleCloseModal: close,
      handleSubmit: submit,
      handleDelete: deleteResume,
      handleDownload: downloadResume,
    },
  };
}

export default useResumes;
