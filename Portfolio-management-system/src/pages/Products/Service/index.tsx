import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { useServices } from "./hooks/useServices";
import { ServiceHeader } from "./components/ServiceHeader";
import { ServiceList } from "./components/ServiceList";
import { ServiceModal } from "./components/ServiceModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";

function ServicePage() {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const {
    services,
    isModalOpen,
    editingService,
    isDeleteDialogOpen,
    handlers,
  } = useServices();

  return (
    <div className="space-y-6">
      <ServiceHeader onAdd={handlers.handleAdd} />

      <ServiceList
        services={services}
        onEdit={handlers.handleEdit}
        onDelete={handlers.handleDeleteClick}
        onToggleActive={handlers.toggleActive}
      />

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handlers.handleCloseModal}
        editingService={editingService}
        onSubmit={handlers.handleSubmit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteDialogOpen}
        onConfirm={handlers.handleDeleteConfirm}
        onCancel={handlers.handleDeleteCancel}
        isDark={isDark}
      />
    </div>
  );
}

export default ServicePage;
