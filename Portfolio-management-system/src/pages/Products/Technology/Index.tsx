import { useState, useEffect, useCallback } from "react";
import { Modal } from "../../../components/ui/model/Model";
import { TechnologyForm } from "./components/form/TechnologyForm";
import { TechnologyHeader } from "./components/header";
import { TechnologyList } from "./components/list";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import type { Technology } from "./types";
import {
  fetchTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "../../../services/api";
import { useToast } from "../../../hooks/useToast";

export function Technologies() {
  const { toast } = useToast();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | undefined>(
    undefined,
  );
  const [deleteId, setDeleteId] = useState<string | number | undefined>(
    undefined,
  );

  const loadTechnologies = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchTechnologies();
      const mappedList = list.map((e: any) => {
        const isUrl = /^https?:\/\/.+/.test(e.iconUrl?.url || "");
        return {
          id: e._id,
          name: e.name || "",
          category: e.category || "",
          icon: e.iconUrl?.url || "",
          iconType: isUrl ? ("image" as const) : ("emoji" as const),
          iconUrl: isUrl ? e.iconUrl?.url : "",
          iconImage: isUrl ? e.iconUrl?.url : "",
          proficiency: 80,
        };
      });
      setTechnologies(mappedList);
    } catch (err) {
      console.error("Failed to load technologies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTechnologies();
  }, [loadTechnologies]);

  const handleAdd = () => {
    setEditingTech(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (tech: Technology) => {
    setEditingTech(tech);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Omit<Technology, "id">) => {
    setLoading(true);
    let finalUrl = "https://placehold.co/100";
    if (data.iconType === "image") {
      finalUrl = data.iconImage || "https://placehold.co/100";
    } else if (data.iconType === "url") {
      finalUrl = data.iconUrl || "https://placehold.co/100";
    } else {
      finalUrl = data.icon || "⚛️";
    }

    const payload = {
      name: data.name,
      description: data.name, // description is required in backend validations
      category: data.category,
      iconUrl: {
        publicId: "tech",
        url: finalUrl,
      },
      isActive: true,
    };

    try {
      if (editingTech) {
        await updateTechnology(editingTech.id.toString(), payload);
        toast({
          title: "Technology Updated",
          description: `Successfully updated ${data.name}`,
          variant: "success",
          duration: 3000,
        });
      } else {
        await createTechnology(payload);
        toast({
          title: "Technology Created",
          description: `Successfully created ${data.name}`,
          variant: "success",
          duration: 3000,
        });
      }
      await loadTechnologies();
      setIsModalOpen(false);
      setEditingTech(undefined);
    } catch (err) {
      console.error("Failed to save technology:", err);
      toast({
        title: "Save Failed",
        description: "Error saving technology. Check console.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string | number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      setLoading(true);
      try {
        await deleteTechnology(deleteId.toString());
        toast({
          title: "Technology Deleted",
          description: "Successfully deleted technology record.",
          variant: "warning",
          duration: 3000,
        });
        await loadTechnologies();
      } catch (err) {
        console.error("Failed to delete technology:", err);
        toast({
          title: "Delete Failed",
          description: "Error deleting technology. Check console.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
    setDeleteId(undefined);
  };

  return (
    <div className="space-y-6">
      <TechnologyHeader onAdd={handleAdd} />
      {loading ? (
        <div className="text-center p-12 text-slate-500">
          Loading technologies...
        </div>
      ) : (
        <TechnologyList
          technologies={technologies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTech(undefined);
        }}
        title={editingTech ? "Edit Technology" : "Add Technology"}
        size="md"
      >
        <TechnologyForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTech(undefined);
          }}
          initialData={editingTech}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(undefined)}
        title="Delete Technology"
        message="Are you sure you want to delete this technology?"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
