import { useState, useEffect, useCallback } from "react";
import type { Service } from "../components/types";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../../../services/api";
import { useToast } from "../../../../hooks/useToast";

export function useServices() {
  const { toast } = useToast();
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
      const mappedList = list.map((e: any) => {
        let extra: any = {};
        try {
          if (e.decription && e.decription.startsWith("{")) {
            extra = JSON.parse(e.decription);
          }
        } catch (err) {
          console.error("Failed to parse decription JSON:", err);
        }

        const isEmoji = e.iconUrl?.publicId?.startsWith("emoji:");
        const emojiVal = isEmoji ? e.iconUrl.publicId.slice(6) : "🛠";

        return {
          id: e._id,
          title: e.name || "",
          subtitle: extra.subtitle || e.name || "",
          category: extra.category || "Development",
          description: extra.description || e.decription || "",
          longDescription: extra.longDescription || e.decription || "",
          icon: isEmoji ? emojiVal : "🛠",
          iconType: isEmoji
            ? ("emoji" as const)
            : e.iconUrl?.url
              ? ("url" as const)
              : ("emoji" as const),
          iconUrl: isEmoji ? "" : e.iconUrl?.url || "",
          photoUrl: e.mainImageUrl?.url || "",
          photoType: "url" as const,
          features:
            extra.features && extra.features.length > 0
              ? extra.features
              : ["Default Service Feature"],
          benefits: extra.benefits || [],
          pricing: extra.pricing || "Custom",
          duration: extra.duration || "Flexible",
          deliverables: extra.deliverables || [],
          active: e.isActive !== false,
        };
      });
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
    let iconUrl = "https://placehold.co/100";
    let iconPublicId = "icon";
    const iconType = data.iconType || "emoji";

    if (iconType === "emoji") {
      iconPublicId = `emoji:${data.icon || "⚡"}`;
      iconUrl = "https://placehold.co/100";
    } else if (iconType === "url") {
      iconPublicId = "icon_url";
      iconUrl = data.iconUrl || "https://placehold.co/100";
    } else if (iconType === "upload") {
      iconPublicId = "icon_upload";
      iconUrl = data.iconUrl || "https://placehold.co/100";
    }

    const extra = {
      subtitle: data.subtitle,
      category: data.category,
      description: data.description,
      longDescription: data.longDescription,
      features: data.features,
      benefits: data.benefits,
      pricing: data.pricing,
      duration: data.duration,
      deliverables: data.deliverables,
    };

    const payload = {
      name: data.title,
      decription: JSON.stringify(extra),
      technologies: [],
      iconUrl: {
        publicId: iconPublicId,
        url: iconUrl,
      },
      mainImageUrl: {
        publicId: "photo",
        url: data.photoUrl || "https://placehold.co/600",
      },
      imagesUrl: [],
    };

    try {
      if (editingService) {
        await updateService(editingService.id.toString(), payload);
        toast({
          title: "Service Updated",
          description: `Successfully updated ${data.title}`,
          variant: "success",
          duration: 3000,
        });
      } else {
        await createService(payload);
        toast({
          title: "Service Created",
          description: `Successfully created ${data.title}`,
          variant: "success",
          duration: 3000,
        });
      }
      await loadServices();
      setIsModalOpen(false);
      setEditingService(null);
    } catch (err) {
      console.error("Failed to save service:", err);
      toast({
        title: "Save Failed",
        description: "Error saving service. Check console.",
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
        await deleteService(deletingId.toString());
        toast({
          title: "Service Deleted",
          description: "Successfully deleted service record.",
          variant: "warning",
          duration: 3000,
        });
        await loadServices();
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      } catch (err) {
        console.error("Failed to delete service:", err);
        toast({
          title: "Delete Failed",
          description: "Error deleting service. Check console.",
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
