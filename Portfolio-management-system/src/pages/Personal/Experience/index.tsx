import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { useToast } from "../../../hooks/useToast";
import type { Experience } from "./components/experienceCard/ExperienceCard";
import { ExperienceModals } from "./components/ExperienceModals";
import { ExperienceHeader } from "./components/ExperienceHeader";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { EmptyExperienceState } from "./components/EmptyExperienceState";
import type { ExperienceFormData } from "../../../validations/experienceSchema";
import utils from "../../../utils/index";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../../services/api";

export const ExperiencePage: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { cn } = utils.tailwindUtils;

  const loadExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchExperiences();
      const mappedList = list.map((e: any) => ({
        id: e._id,
        jobTitle: e.position || "",
        company: e.companyName || "",
        location: e.field || "",
        startDate: e.dateOfJoining
          ? new Date(e.dateOfJoining).toISOString().split("T")[0]
          : "",
        endDate: e.dateOfLeaving
          ? new Date(e.dateOfLeaving).toISOString().split("T")[0]
          : null,
        isCurrent: e.stillWorking || false,
        achievements: e.description ? e.description.split("\n") : [],
        features: e.description ? e.description.split("\n") : [],
        description: e.description || "",
      }));
      setExperiences(mappedList);
    } catch (err) {
      console.error("Failed to load experiences:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

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

  const handleSubmitExperience = async (data: ExperienceFormData) => {
    const payload = {
      companyName: data.company,
      position: data.jobTitle,
      field: data.location,
      projectsCompleted: [],
      description: (data.features && data.features.length > 0)
        ? data.features.filter((f): f is string => f !== undefined).join("\n")
        : data.description || "Experience description",
      dateOfJoining: new Date(data.startDate).toISOString(),
      dateOfLeaving: data.isCurrent
        ? undefined
        : data.endDate
          ? new Date(data.endDate).toISOString()
          : undefined,
      stillWorking: data.isCurrent || false,
    };

    try {
      if (editingId) {
        await updateExperience(editingId, payload);
        toast({
          title: "Experience Updated",
          description: `Successfully updated ${data.jobTitle} at ${data.company}`,
          variant: "success",
          duration: 3000,
        });
      } else {
        await createExperience(payload);
        toast({
          title: "Experience Added",
          description: `Successfully added ${data.jobTitle} at ${data.company}`,
          variant: "success",
          duration: 3000,
        });
      }
      await loadExperiences();
    } catch (err) {
      console.error("Failed to save experience:", err);
      toast({
        title: "Error",
        description: "Failed to save experience records.",
        variant: "destructive",
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
    try {
      await deleteExperience(deletingId);
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
    } catch (err) {
      console.error("Failed to delete experience:", err);
    }
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
        {loading ? (
          <div className="text-center p-12 text-slate-500">
            Loading experiences...
          </div>
        ) : experiences.length === 0 ? (
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
