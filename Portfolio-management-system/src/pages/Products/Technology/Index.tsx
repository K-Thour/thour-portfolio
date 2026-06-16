import { useState, useEffect, useCallback } from "react";
import { Modal } from "../../../components/ui/model/Model";
import { TechnologyForm } from "./components/form/TechnologyForm";
import { TechnologyHeader } from "./components/header";
import { TechnologyList } from "./components/list";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import type { Technology } from "./types";
import { fetchTechnologies, createTechnology, updateTechnology, deleteTechnology } from "../../../services/api";

export function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | number | undefined>(undefined);

  const loadTechnologies = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchTechnologies();
      const mappedList = list.map((e: any) => ({
        id: e._id,
        name: e.name || "",
        category: e.category || "",
        icon: e.iconUrl?.url || "",
        iconType: "url",
        iconUrl: e.iconUrl?.url || "",
        proficiency: 80,
      }));
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
    const payload = {
      name: data.name,
      description: data.name, // description is required in backend validations
      category: data.category,
      iconUrl: { publicId: "tech", url: data.iconUrl || data.icon || "https://placehold.co/100" },
      isActive: true,
    };

    try {
      if (editingTech) {
        await updateTechnology(editingTech.id.toString(), payload);
      } else {
        await createTechnology(payload);
      }
      await loadTechnologies();
      setIsModalOpen(false);
      setEditingTech(undefined);
    } catch (err) {
      console.error("Failed to save technology:", err);
    }
  };

  const handleDelete = (id: string | number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteTechnology(deleteId.toString());
        await loadTechnologies();
      } catch (err) {
        console.error("Failed to delete technology:", err);
      }
    }
    setDeleteId(undefined);
  };

  return (
    <div className="space-y-6">
      <TechnologyHeader onAdd={handleAdd} />
      {loading ? (
        <div className="text-center p-12 text-slate-500">Loading technologies...</div>
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
