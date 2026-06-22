import { useToast } from "../../../../hooks/useToast";
import { useResumes } from "./useResumes";
import type { ResumeFormData, Resume } from "../types";

export function useResumePage() {
  const { toast } = useToast();
  const { resumes, isModalOpen, handlers } = useResumes();

  const handleSubmit = async (data: ResumeFormData) => {
    console.log("Submitting resume:", data);
    try {
      toast({
        title: "Resume Generation Started",
        description: "Your resume is being generated via AI...",
        variant: "default",
        duration: 3000,
      });
      await handlers.handleSubmit();
      toast({
        title: "Resume Generated",
        description: "Successfully generated resume with AI.",
        variant: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to generate resume:", err);
      toast({
        title: "Generation Failed",
        description: "Error generating resume. Check console.",
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
        description: "Error deleting resume. Check console.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDownload = (resume: Resume) => {
    try {
      handlers.handleDownload(resume);
      toast({
        title: "Download Started",
        description: "Your resume is being downloaded.",
        variant: "success",
        duration: 2000,
      });
    } catch (err) {
      console.error("Failed to download resume:", err);
      toast({
        title: "Download Failed",
        description: "Error downloading resume.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return {
    resumes,
    isModalOpen,
    handlers: { ...handlers, handleSubmit, handleDelete, handleDownload },
  };
}
