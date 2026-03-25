import { useState } from "react";
import { serviceData } from "./Data/serviceData";
import type { Service } from "../../types";

export function useServices() {
  const [services, setServices] = useState<Service[]>(serviceData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Service, "id" | "active">) => {
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? { ...data, id: editingService.id, active: editingService.active }
            : s,
        ),
      );
    } else {
      setServices([...services, { ...data, id: Date.now(), active: true }]);
    }
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setServices(services.filter((s) => s.id !== deletingId));
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
    setEditingService(null);
  };

  const toggleActive = (id: number) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  };

  return {
    services,
    isModalOpen,
    editingService,
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
      toggleActive,
    },
  };
}
