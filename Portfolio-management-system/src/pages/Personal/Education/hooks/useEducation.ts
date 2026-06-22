import { useState, useEffect, useCallback } from "react";
import type { Education, EducationFormData } from "../types";
import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../../../services/api";
import { useToast } from "../../../../hooks/useToast";

export function useEducation() {
  const { toast } = useToast();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);

  const loadEducation = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchEducation();
      const mappedList = list.map((e: any) => {
        const start = e.startYear
          ? new Date(e.startYear).getFullYear().toString()
          : "";
        const end = e.isPursuing
          ? "Present"
          : e.endYear
            ? new Date(e.endYear).getFullYear().toString()
            : "";
        const period = start && end ? `${start} - ${end}` : start || end || "";
        return {
          id: e._id,
          degree: e.degree || "",
          institution: e.institution || "",
          period,
          description: e.description || "",
          grade: e.grade || "",
          // Store raw properties for form initial values
          level: e.level,
          field_of_study: e.field_of_study,
          startYear: e.startYear,
          endYear: e.endYear,
          isPursuing: e.isPursuing,
          gradeType: e.gradeType,
        };
      });
      setEducationList(mappedList);
    } catch (err) {
      console.error("Failed to load education:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEducation();
  }, [loadEducation]);

  const handleAdd = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: EducationFormData) => {
    // Map frontend fields to backend validation schema
    const payload = {
      level: data.level,
      degree: data.degree,
      field_of_study: data.degree,
      institution: data.institution,
      startYear: new Date(data.startDate).toISOString(),
      endYear: data.current ? "pursuing" : new Date(data.endDate).toISOString(),
      isPursuing: data.current,
      gradeType: data.gradeType,
      grade: data.grade,
      description: data.description || "Education details",
    };

    try {
      if (editingEducation) {
        await updateEducation(editingEducation.id.toString(), payload);
        toast({
          title: "Education Updated",
          description: `Successfully updated ${data.degree} at ${data.institution}`,
          variant: "success",
          duration: 3000,
        });
      } else {
        await createEducation(payload);
        toast({
          title: "Education Added",
          description: `Successfully added ${data.degree} at ${data.institution}`,
          variant: "success",
          duration: 3000,
        });
      }
      await loadEducation();
      setIsModalOpen(false);
      setEditingEducation(null);
    } catch (err) {
      console.error("Failed to save education:", err);
      toast({
        title: "Error",
        description: "Failed to save education records.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      try {
        await deleteEducation(deletingId.toString());
        setEducationList(educationList.filter((e) => e.id !== deletingId));
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
        toast({
          title: "Education Deleted",
          description: "Successfully deleted education record.",
          variant: "warning",
          duration: 3000,
        });
      } catch (err) {
        console.error("Failed to delete education:", err);
        toast({
          title: "Error",
          description: "Failed to delete education record.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEducation(null);
  };

  return {
    educationList,
    isModalOpen,
    editingEducation,
    isDeleteDialogOpen,
    deletingId,
    loading,
    handlers: {
      handleAdd,
      handleEdit,
      handleSubmit,
      handleDeleteClick,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleCloseModal,
    },
  };
}
