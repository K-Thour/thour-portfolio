import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { useToast } from "../../../hooks/useToast";
import type { Experience } from "./components/experienceCard/ExperienceCard";
import { ExperienceModals } from "./components/ExperienceModals";
import { ExperienceHeader } from "./components/ExperienceHeader";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { EmptyExperienceState } from "./components/EmptyExperienceState";
import { sampleExperiences } from "./data/experienceData";
import type { ExperienceFormData } from "../../../validations/experienceSchema";
import utils from "../../../utils/index";

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
  const { cn } = utils.tailwindUtils;

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
      <ExperienceHeader isDark={isDark} onAddExperience={handleAddExperience} />

      <div className={cn("flex-1")}>
        {experiences.length === 0 ? (
          <EmptyExperienceState
            isDark={isDark}
            onAddExperience={handleAddExperience}
          />
        ) : (
          <ExperienceTimeline
            experiences={experiences}
            isDark={isDark}
            onEdit={handleEditExperience}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <ExperienceModals
        isWizardOpen={isWizardOpen}
        deleteModalOpen={deleteModalOpen}
        isDark={isDark}
        editingId={editingId}
        editingExperience={editingExperience || null}
        onCloseWizard={handleCloseWizard}
        onSubmitExperience={handleSubmitExperience}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ExperiencePage;
