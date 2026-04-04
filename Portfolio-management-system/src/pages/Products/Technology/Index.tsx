import { useState } from "react";
import { Modal } from "../../../components/ui/model/Model";
import { TechnologyForm } from "./components/form/TechnologyForm";
import { TechnologyHeader } from "./components/header";
import { TechnologyList } from "./components/list";
import { technologiesData } from "./Data/Technologies";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import type { Technology } from "./types";

export function Technologies() {
  const [technologies, setTechnologies] =
    useState<Technology[]>(technologiesData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | undefined>(
    undefined,
  );
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined);

  const handleAdd = () => {
    setEditingTech(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (tech: Technology) => {
    setEditingTech(tech);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Technology, "id">) => {
    if (editingTech) {
      // Update existing
      setTechnologies(
        technologies.map((t) =>
          t.id === editingTech.id ? { ...data, id: editingTech.id } : t,
        ),
      );
    } else {
      // Add new
      setTechnologies([...technologies, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingTech(undefined);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      setTechnologies(technologies.filter((t) => t.id !== deleteId));
    }
    setDeleteId(undefined);
  };

  return (
    <div className="space-y-6">
      <TechnologyHeader onAdd={handleAdd} />
      <TechnologyList
        technologies={technologies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
