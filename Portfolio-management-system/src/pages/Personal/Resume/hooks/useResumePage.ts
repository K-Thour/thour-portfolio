import { useToast } from "../../../../hooks/useToast";
import { useResumes } from "./useResumes";
import type { ResumeFormData, Resume } from "../types";

export function useResumePage() {
  const { toast } = useToast();
  const {
    resumes,
    loading,
    isModalOpen,
    regeneratingId,
    togglingActiveId,
    handlers,
  } = useResumes();

  const handleSubmit = async (data: ResumeFormData) => {
    try {
      toast({
        title: "Task Queued in Background",
        description: `Generating "${data.name}" in background task manager.`,
        variant: "default",
        duration: 3500,
      });
      await handlers.handleSubmit(data);
    } catch (err: any) {
      console.error("Failed to enqueue resume task:", err);
      toast({
        title: "Task Error",
        description: err?.message || "Failed to start background task.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleRegenerate = async (resume: Resume) => {
    try {
      toast({
        title: "Regeneration Queued",
        description: `Regenerating "${resume.name}" with fresh AI tailoring.`,
        variant: "default",
        duration: 3500,
      });
      await handlers.handleRegenerate(resume);
    } catch (err: any) {
      console.error("Failed to regenerate resume:", err);
      toast({
        title: "Regeneration Failed",
        description: err?.message || "Failed to queue regeneration task.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleToggleActive = async (resume: Resume) => {
    try {
      const willBeActive = !resume.isActive;
      await handlers.handleToggleActive(resume);
      toast({
        title: willBeActive ? "Resume Activated" : "Resume Deactivated",
        description: willBeActive
          ? `"${resume.name}" is now the active primary resume.`
          : `"${resume.name}" has been deactivated.`,
        variant: willBeActive ? "success" : "default",
        duration: 3000,
      });
    } catch (err: any) {
      console.error("Failed to toggle active status:", err);
      toast({
        title: "Update Failed",
        description: err?.message || "Failed to update active status.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await handlers.handleDelete(id);
      toast({
        title: "Resume Deleted",
        description: "The resume has been removed from your collection.",
        variant: "warning",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to delete resume:", err);
      toast({
        title: "Delete Failed",
        description: "Error deleting resume.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDownload = (resume: Resume) => {
    try {
      if (!resume.generatedFileUrl) {
        throw new Error(
          "Resume file is not ready yet. Please wait for generation to complete.",
        );
      }
      handlers.handleDownload(resume);
      toast({
        title: "Opening Document",
        description: "Your resume document is opening.",
        variant: "success",
        duration: 2000,
      });
    } catch (err: any) {
      console.error("Failed to download resume:", err);
      toast({
        title: "Download Unavailable",
        description: err?.message || "Error opening resume download file.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return {
    resumes,
    loading,
    isModalOpen,
    regeneratingId,
    togglingActiveId,
    handlers: {
      ...handlers,
      handleSubmit,
      handleDelete,
      handleDownload,
      handleRegenerate,
      handleToggleActive,
    },
  };
}

export default useResumePage;
