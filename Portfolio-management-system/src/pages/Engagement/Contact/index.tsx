import { motion } from "motion/react";
import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { Modal } from "../../../components/ui/model/Model";
import ConfirmModal from "../../../components/common/confirmModel/confirmModel";
import { ContactsHeader } from "./components/ContactsHeader";
import { ActiveContactBanner } from "./components/ActiveContactBanner";
import { ContactsGrid } from "./components/ContactsGrid";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { ContactDetailsModal } from "./components/ContactDetailsModal/ContactDetailsModal";
import { useContacts } from "./hooks/useContacts";

function ContactPage() {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const {
    contacts,
    activeContact,
    isModalOpen,
    editingContact,
    viewingContact,
    isDeleteDialogOpen,
    handleAdd,
    handleEdit,
    handleView,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleSetActive,
    handleCloseModal,
    handleCloseViewModal,
  } = useContacts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ContactsHeader isDark={isDark} onAdd={handleAdd} />

      <ActiveContactBanner contact={activeContact} isDark={isDark} />

      <ContactsGrid
        contacts={contacts}
        isDark={isDark}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onSetActive={handleSetActive}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingContact ? "Edit Contact Information" : "Add New Contact"}
        size="lg"
      >
        <ContactForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          initialData={editingContact}
        />
      </Modal>

      <ContactDetailsModal
        isOpen={!!viewingContact}
        onClose={handleCloseViewModal}
        contact={viewingContact}
      />

      <ConfirmModal
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title={isDark ? "Delete Contact?" : "Remove Contact Information?"}
        message={
          isDark
            ? "This will permanently remove this contact information. This action cannot be undone."
            : "This contact information will be removed from the sacred records. It cannot be restored."
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}

export default ContactPage;
