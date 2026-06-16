import { useState, useCallback, useEffect } from "react";
import type { Resume, ResumeFormData } from "../types";
import { fetchResumes, deleteResume as deleteResumeApi, generateResumeAI } from "../../../../services/api";

export function useResumeOperations() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchResumes();
      const mappedList = list.map((r: any) => ({
        id: r._id,
        name: r.name,
        description: r.description || '',
        jobLink: r.jobUrl || '',
        designType: r.designType || 'latex',
        latexCode: r.latexCode || '',
        status: r.isActive ? 'completed' : 'pending',
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        generatedFileUrl: r.resumeUrl,
      }));
      setResumes(mappedList);
    } catch (err) {
      console.error("Failed to load resumes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const createResume = useCallback(
    async (formData: ResumeFormData): Promise<Resume> => {
      const response = await generateResumeAI({
        name: formData.name,
        description: formData.description,
        jobLink: formData.jobLink,
      });
      const newResume: Resume = {
        id: response._id,
        name: response.name,
        description: response.description || '',
        jobLink: response.jobUrl || '',
        designType: response.designType || 'latex',
        latexCode: response.latexCode || '',
        status: 'completed',
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        generatedFileUrl: response.resumeUrl,
      };
      setResumes((prev) => [newResume, ...prev]);
      return newResume;
    },
    [],
  );

  const deleteResume = useCallback(async (id: string) => {
    try {
      await deleteResumeApi(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete resume:", err);
    }
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
    loading,
    deletingId,
    toggleResumeDeleting,
    setDeletingId,
    createResume,
    deleteResume,
    downloadResume,
  };
}
