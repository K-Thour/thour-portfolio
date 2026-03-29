import { useState } from "react";
import type { Education, EducationFormData } from "../types";
import { sampleEducation } from "../data/educationData";

export function useEducation() {
  const [educationList, setEducationList] =
    useState<Education[]>(sampleEducation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: EducationFormData) => {
    const period = data.current
      ? `${data.startDate} - Present`
      : `${data.startDate} - ${data.endDate}`;
    const formattedData = { ...data, period };

    if (editingEducation) {
      setEducationList(
        educationList.map((e) =>
          e.id === editingEducation.id
            ? { ...formattedData, id: editingEducation.id }
            : e,
        ),
      );
    } else {
      setEducationList([
        ...educationList,
        { ...formattedData, id: Date.now() },
      ]);
    }
    setIsModalOpen(false);
    setEditingEducation(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setEducationList(educationList.filter((e) => e.id !== deletingId));
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
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
