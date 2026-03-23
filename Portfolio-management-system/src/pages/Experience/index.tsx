import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useAppSelector } from "../../hooks/useRedux";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/ui/button/Button";
import type { Experience } from "./components/experienceCard/ExperienceCard";
import { ExperienceCard } from "./components/experienceCard/ExperienceCard";
import { ExperienceFormWizard } from "../../components/common/experienceWizard/ExperienceFormWizard";
import ConfirmModal from "../../components/common/confirmModel/ConfirmModel";
import type { ExperienceFormData } from "../../validations/experienceSchema";
import utils from "../../utils";

const { cn } = utils.tailwindUtils;

// Sample data - in real app, this would come from API/Redux store
const sampleExperiences: Experience[] = [
  {
    id: "1",
    jobTitle: "Senior Full Stack Developer",
    company: "Tech Giants Inc.",
    location: "San Francisco, CA",
    startDate: "2021",
    endDate: null,
    isCurrent: true,
    achievements: [
      "Led development of enterprise-scale applications",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines and DevOps practices",
    ],
  },
  {
    id: "2",
    jobTitle: "Full Stack Developer",
    company: "StartupCo",
    location: "New York, NY",
    startDate: "2019",
    endDate: "2021",
    isCurrent: false,
    achievements: [
      "Built and maintained multiple web applications",
      "Collaborated with cross-functional teams",
      "Optimized application performance by 40%",
    ],
  },
  {
    id: "3",
    jobTitle: "Junior Developer",
    company: "Web Solutions Ltd",
    location: "Austin, TX",
    startDate: "2017",
    endDate: "2019",
    isCurrent: false,
    achievements: [
      "Developed responsive frontend interfaces",
      "Assisted in backend API development",
      "Participated in agile development processes",
    ],
  },
];

// Convert Experience to ExperienceFormData format
const experienceToFormData = (exp: Experience): ExperienceFormData => ({
  jobTitle: exp.jobTitle,
  company: exp.company,
  location: exp.location,
  startDate: exp.startDate,
  endDate: exp.endDate,
  isCurrent: exp.isCurrent,
  description: "",
  technologies: [],
  features: exp.achievements || [],
  linkedInUrl: null,
  companyUrl: null,
});

export const ExperiencePage: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const { toast } = useToast();
  const [experiences, setExperiences] =
    useState<Experience[]>(sampleExperiences);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddExperience = () => {
    setEditingId(null);
    setIsWizardOpen(true);
  };

  const handleEditExperience = (id: string) => {
    setEditingId(id);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setEditingId(null);
  };

  const handleSubmitExperience = (data: ExperienceFormData) => {
    if (editingId) {
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingId
            ? {
                ...exp,
                jobTitle: data.jobTitle,
                company: data.company,
                location: data.location,
                startDate: data.startDate,
                endDate: data.endDate ?? null,
                isCurrent: data.isCurrent ?? false,
                achievements: data.features.filter(
                  (f): f is string => f !== undefined,
                ),
              }
            : exp,
        ),
      );
      toast({
        title: "Experience Updated",
        description: `Successfully updated ${data.jobTitle} at ${data.company}`,
        variant: "success",
        duration: 3000,
      });
    } else {
      const newExperience: Experience = {
        id: Date.now().toString(),
        jobTitle: data.jobTitle,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate ?? null,
        isCurrent: data.isCurrent ?? false,
        achievements: data.features.filter((f): f is string => f !== undefined),
      };
      setExperiences((prev) => [newExperience, ...prev]);
      toast({
        title: "Experience Added",
        description: `Successfully added ${data.jobTitle} at ${data.company}`,
        variant: "success",
        duration: 3000,
      });
    }
    handleCloseWizard();
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const expToDelete = experiences.find((e) => e.id === deletingId);
    setExperiences((prev) => prev.filter((exp) => exp.id !== deletingId));
    toast({
      title: "Experience Deleted",
      description: expToDelete
        ? `Deleted ${expToDelete.jobTitle} at ${expToDelete.company}`
        : "Experience deleted",
      variant: "warning",
      duration: 3000,
    });
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setDeletingId(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingId(null);
  };

  const editingExperience = editingId
    ? experiences.find((e) => e.id === editingId)
    : null;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight mb-2",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            Work Experience
          </h1>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            Manage your professional experience
          </p>
        </div>

        <Button
          onClick={handleAddExperience}
          className={cn(
            "bg-linear-to-r from-orange-500 to-red-500",
            "hover:from-orange-600 hover:to-red-600",
            "text-white border-0",
            "shadow-lg shadow-orange-500/25",
            "px-6 py-2.5 rounded-xl",
            "flex items-center gap-2",
          )}
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </Button>
      </div>

      {/* Experience Timeline */}
      <div className="flex-1">
        {experiences.length === 0 ? (
          <div
            className={cn(
              "flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed",
              isDark
                ? "border-slate-700 text-slate-500"
                : "border-slate-300 text-slate-400",
            )}
          >
            <p className="text-lg font-medium mb-2">No experience yet</p>
            <p className="text-sm mb-6">
              Start by adding your first work experience
            </p>
            <Button
              onClick={handleAddExperience}
              className={cn(
                "bg-linear-to-r from-orange-500 to-red-500",
                "hover:from-orange-600 hover:to-red-600",
                "text-white border-0",
                "shadow-lg shadow-orange-500/25",
              )}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isDark={isDark}
                isLast={index === experiences.length - 1}
                onEdit={handleEditExperience}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Wizard Modal */}
      <ExperienceFormWizard
        isOpen={isWizardOpen}
        onClose={handleCloseWizard}
        onSubmit={handleSubmitExperience}
        initialData={
          editingExperience
            ? experienceToFormData(editingExperience)
            : undefined
        }
        isDark={isDark}
        isEditing={!!editingId}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        loading={isDeleting}
        isDark={isDark}
      />
    </div>
  );
};

export default ExperiencePage;
