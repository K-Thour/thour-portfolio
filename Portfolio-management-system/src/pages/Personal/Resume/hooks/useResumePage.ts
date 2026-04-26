import { useToast } from "../../../../hooks/useToast";
import { useResumes } from "./useResumes";
import type { ResumeFormData, Resume } from "../types";

export function useResumePage() {
  const { toast } = useToast();
  const { resumes, isModalOpen, handlers } = useResumes();

  const handleSubmit = async (data: ResumeFormData) => {
    console.log("Submitting resume:", data);
    toast({
      title: "Resume Generation Started",
      description:
        "Your resume is being generated. You'll be notified when it's ready.",
      variant: "success",
      duration: 3000,
    });
    handlers.handleCloseModal();
  };

  const handleDelete = (id: string) => {
    handlers.handleDelete(id);
    toast({
      title: "Resume Deleted",
      description: "The resume has been removed from your collection.",
      variant: "warning",
      duration: 3000,
    });
  };

  const handleDownload = (resume: Resume) => {
    handlers.handleDownload(resume);
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded.",
      variant: "success",
      duration: 2000,
    });
  };

  return {
    resumes,
    isModalOpen,
    handlers: { ...handlers, handleSubmit, handleDelete, handleDownload },
  };
}
