import { useState, useCallback } from "react";
import type { Resume, ResumeFormData } from "../types";
import { sampleResumes } from "../data/initialData";

export function useResumeOperations() {
  const [resumes, setResumes] = useState<Resume[]>(sampleResumes);
  const [, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const createResume = useCallback(
    async (formData: ResumeFormData): Promise<Resume> => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newResume: Resume = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        jobLink: formData.jobLink,
        designType: formData.designType,
        designUrl: formData.designUrl,
        latexCode: formData.latexCode,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setResumes((prev) => [newResume, ...prev]);
      return newResume;
    },
    [],
  );

  const deleteResume = useCallback((id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  }, []);
  const downloadResume = useCallback((resume: Resume) => {
    if (resume.generatedFileUrl) window.open(resume.generatedFileUrl, "_blank");
  }, []);

  const toggleResumeDeleting = useCallback(
    (id: string) => {
      setDeletingId((prev) => (prev === id ? null : id));
    },
    [setDeletingId],
  );

  return {
    resumes,
    setIsSubmitting,
    deletingId,
    toggleResumeDeleting,
    setDeletingId,
    createResume,
    deleteResume,
    downloadResume,
  };
}
