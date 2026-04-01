import { useState, useCallback } from "react";
import type { Contact, ContactFormData } from "../types";
import { contactsData } from "../data/ContactsData";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = useCallback(() => {
    setEditingContact(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  }, []);

  const handleView = useCallback((contact: Contact) => {
    setViewingContact(contact);
  }, []);

  const handleSubmit = useCallback(
    (data: ContactFormData) => {
      if (editingContact) {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === editingContact.id
              ? {
                  ...data,
                  id: editingContact.id,
                  isActive: editingContact.isActive,
                }
              : c,
          ),
        );
      } else {
        setContacts((prev) => [
          ...prev,
          { ...data, id: Date.now(), isActive: false },
        ]);
      }
      setIsModalOpen(false);
      setEditingContact(null);
    },
    [editingContact],
  );

  const handleDeleteClick = useCallback((id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deletingId) {
      setContacts((prev) => prev.filter((c) => c.id !== deletingId));
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  }, [deletingId]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  }, []);

  const handleSetActive = useCallback((id: number) => {
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        isActive: c.id === id,
      })),
    );
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingContact(null);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setViewingContact(null);
  }, []);

  const activeContact = contacts.find((c) => c.isActive);

  return {
    contacts,
    activeContact,
    isModalOpen,
    editingContact,
    viewingContact,
    isDeleteDialogOpen,
    deletingId,
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
  };
}
