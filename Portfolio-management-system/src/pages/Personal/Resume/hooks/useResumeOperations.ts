import { useState, useCallback, useEffect } from "react";
import type { Resume, ResumeFormData } from "../types";
import {
  fetchResumes,
  deleteResume as deleteResumeApi,
  updateResume,
  generateResumeAI,
} from "../../../../services/api";

import envConstraints from "../../../../constraints/env.constraints";

export function useResumeOperations() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchResumes();
      const mappedList = list.map((r: any) => ({
        id: r._id,
        name: r.name,
        description: r.description || "",
        jobLink: r.jobUrl || "",
        targetRole: r.targetRole,
        selectedProjectIds: Array.isArray(r.projectsUsed)
          ? r.projectsUsed.map((p: any) =>
              p?._id ? p._id.toString() : p.toString(),
            )
          : [],
        selectedExperienceIds: Array.isArray(r.experiencesUsed)
          ? r.experiencesUsed.map((e: any) =>
              e?._id ? e._id.toString() : e.toString(),
            )
          : [],
        designType: r.designType || "ats",
        latexCode: r.latexCode || "",
        isActive: Boolean(r.isActive),
        status: "completed",
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

  const toggleActiveResume = useCallback(
    async (resume: Resume) => {
      const nextActive = !resume.isActive;
      const targetId = resume.id;
      setTogglingActiveId(targetId);

      // Optimistic update: set target to nextActive, and if nextActive is true, set all others to false
      setResumes((prev) =>
        prev.map((r) => {
          if (r.id === targetId) {
            return { ...r, isActive: nextActive };
          }
          if (nextActive) {
            return { ...r, isActive: false };
          }
          return r;
        }),
      );

      try {
        await updateResume(targetId, { isActive: nextActive });
      } catch (err) {
        console.error("Failed to toggle resume active status:", err);
        await loadResumes();
      } finally {
        setTogglingActiveId(null);
      }
    },
    [loadResumes],
  );

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const createResume = useCallback(
    async (formData: ResumeFormData): Promise<Resume> => {
      setLoading(true);
      try {
        const response = await generateResumeAI({
          name: formData.name,
          description: formData.description,
          jobLink: formData.jobLink,
          targetRole: formData.targetRole,
          selectedProjectIds: formData.selectedProjectIds,
          selectedExperienceIds: formData.selectedExperienceIds,
          designType: formData.designType || "ats",
          latexCode: formData.latexCode,
          designFileUrl: formData.designUrl,
        });
        const newResume: Resume = {
          id: response._id,
          name: response.name,
          description: response.description || formData.description || "",
          jobLink: response.jobUrl || formData.jobLink || "",
          targetRole: response.targetRole || formData.targetRole,
          selectedProjectIds:
            response.projectsUsed || formData.selectedProjectIds,
          selectedExperienceIds:
            response.experiencesUsed || formData.selectedExperienceIds,
          designType: response.designType || formData.designType || "ats",
          latexCode: response.latexCode || formData.latexCode || "",
          status: "completed",
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          generatedFileUrl: response.resumeUrl,
        };
        setResumes((prev) => [newResume, ...prev]);
        return newResume;
      } catch (err) {
        console.error("Failed to create resume:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteResume = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteResumeApi(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete resume:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadResume = useCallback((resume: Resume) => {
    let targetUrl = resume.generatedFileUrl;
    if (targetUrl) {
      if (targetUrl.includes("localhost:3000/api")) {
        targetUrl = targetUrl.replace(
          "http://localhost:3000/api",
          envConstraints.API_BASE_URL,
        );
      }
      window.open(targetUrl, "_blank");
    } else {
      const resumeId = resume.id || (resume as any)._id;
      if (resumeId) {
        window.open(
          `${envConstraints.API_BASE_URL}/resume/download/pdf/${resumeId}`,
          "_blank",
        );
      } else {
        throw new Error("Resume download link is not available yet.");
      }
    }
  }, []);

  const toggleResumeDeleting = useCallback(
    (id: string) => {
      setDeletingId((prev) => (prev === id ? null : id));
    },
    [setDeletingId],
  );

  const addResume = useCallback((createdResume: any) => {
    const newResume: Resume = {
      id: createdResume._id,
      name: createdResume.name,
      description: createdResume.description || "",
      jobLink: createdResume.jobUrl || "",
      designType: createdResume.designType || "latex",
      latexCode: createdResume.latexCode || "",
      status: "completed",
      createdAt: createdResume.createdAt,
      updatedAt: createdResume.updatedAt,
      generatedFileUrl: createdResume.resumeUrl,
    };
    setResumes((prev) => [
      newResume,
      ...prev.filter((r) => r.id !== newResume.id),
    ]);
  }, []);

  return {
    resumes,
    loading,
    deletingId,
    toggleResumeDeleting,
    setDeletingId,
    createResume,
    addResume,
    refreshResumes: loadResumes,
    deleteResume,
    downloadResume,
    toggleActiveResume,
    togglingActiveId,
  };
}
