import { useState, useCallback, useEffect } from "react";
import type { Contact, ContactFormData } from "../types";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../../../../services/api";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchContacts();
      const mappedList = list.map((c: any) => ({
        id: c._id,
        Address1: c.Address1,
        Address2: c.Address2 || "",
        startWorkingDay: c.startWorkingDay,
        endWorkingDay: c.endWorkingDay,
        startWorkingHour: c.startWorkingHour,
        endWorkingHour: c.endWorkingHour,
        isActive: c.isActive !== false,
      }));
      setContacts(mappedList);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

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
    async (data: ContactFormData) => {
      try {
        if (editingContact) {
          await updateContact(editingContact.id.toString(), data);
        } else {
          await createContact(data);
        }
        await loadContacts();
        setIsModalOpen(false);
        setEditingContact(null);
      } catch (err) {
        console.error("Failed to save contact:", err);
      }
    },
    [editingContact, loadContacts],
  );

  const handleDeleteClick = useCallback((id: string | number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (deletingId) {
      try {
        await deleteContact(deletingId.toString());
        await loadContacts();
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      } catch (err) {
        console.error("Failed to delete contact:", err);
      }
    }
  }, [deletingId, loadContacts]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  }, []);

  const handleSetActive = useCallback(
    async (id: string | number) => {
      try {
        // Set target active
        await updateContact(id.toString(), { isActive: true });
        // Set all others inactive (frontend pattern, backend update for each)
        const updates = contacts
          .filter((c) => c.id !== id && c.isActive)
          .map((c) => updateContact(c.id.toString(), { isActive: false }));
        await Promise.all(updates);
        await loadContacts();
      } catch (err) {
        console.error("Failed to set active contact:", err);
      }
    },
    [contacts, loadContacts],
  );

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
    loading,
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
