import { useState, useCallback } from "react";
import { useResumeForm } from "./useResumeForm";
import { useResumeOperations } from "./useResumeOperations";

export function useResumes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formData, validateForm, resetForm } = useResumeForm();
  const {
    resumes,
    setIsSubmitting,
    createResume,
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

  const submit = useCallback(async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await createResume(formData);
    setIsSubmitting(false);
    close();
  }, [formData, validateForm, setIsSubmitting, createResume, close]);

  return {
    resumes,
    isModalOpen,
    handlers: {
      handleOpenModal: open,
      handleCloseModal: close,
      handleSubmit: submit,
      handleDelete: deleteResume,
      handleDownload: downloadResume,
    },
  };
}
