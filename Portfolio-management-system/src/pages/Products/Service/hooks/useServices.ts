import { useState, useEffect, useCallback } from "react";
import type { Service } from "../components/types";
import { fetchServices, createService, updateService, deleteService } from "../../../../services/api";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchServices();
      const mappedList = list.map((e: any) => ({
        id: e._id,
        title: e.name || "",
        subtitle: "",
        category: "Development",
        description: e.decription || "",
        icon: e.iconUrl?.url || "🛠",
        iconType: "url",
        iconUrl: e.iconUrl?.url || "",
        photoUrl: e.mainImageUrl?.url || "",
        photoType: "url",
        features: [],
        benefits: [],
        pricing: "Custom",
        duration: "Flexible",
        deliverables: [],
        active: e.isActive !== false,
      }));
      setServices(mappedList);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Omit<Service, "id" | "active">) => {
    const payload = {
      name: data.title,
      decription: data.description, // Mongoose schema has decription typo
      technologies: [],
      iconUrl: { publicId: "icon", url: data.iconUrl || data.icon || "https://placehold.co/100" },
      mainImageUrl: { publicId: "photo", url: data.photoUrl || "https://placehold.co/600" },
      imagesUrl: [],
    };

    try {
      if (editingService) {
        await updateService(editingService.id.toString(), payload);
      } else {
        await createService(payload);
      }
      await loadServices();
      setIsModalOpen(false);
      setEditingService(null);
    } catch (err) {
      console.error("Failed to save service:", err);
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      try {
        await deleteService(deletingId.toString());
        await loadServices();
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      } catch (err) {
        console.error("Failed to delete service:", err);
      }
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

  const toggleActive = async (id: string | number) => {
    // Find current service in local state to see active status
    const target = services.find((s) => s.id === id);
    if (!target) return;
    try {
      await updateService(id.toString(), { isActive: !target.active });
      await loadServices();
    } catch (err) {
      console.error("Failed to toggle service status:", err);
    }
  };

  return {
    services,
    loading,
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
