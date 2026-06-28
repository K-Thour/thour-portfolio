import { useState, useCallback, useEffect } from "react";
import type { Contact, ContactFormData } from "../types";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../../../../services/api";
import { useToast } from "../../../../hooks/useToast";

export function useContacts() {
  const { toast } = useToast();
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
        label: c.label,
        email: c.email,
        phone: c.phone,
        address: c.address,
        city: c.city,
        state: c.state,
        country: c.country,
        zipCode: c.zipCode,
        website: c.website || "",
        linkedin: c.linkedin || "",
        github: c.github || "",
        twitter: c.twitter || "",
        instagram: c.instagram || "",
        facebook: c.facebook || "",
        youtube: c.youtube || "",
        availability: c.availability || "",
        timezone: c.timezone || "",
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
      setLoading(true);
      try {
        if (editingContact) {
          await updateContact(editingContact.id.toString(), data);
          toast({
            title: "Contact Updated",
            description: "Successfully updated contact information.",
            variant: "success",
            duration: 3000,
          });
        } else {
          await createContact(data);
          toast({
            title: "Contact Added",
            description: "Successfully added new contact information.",
            variant: "success",
            duration: 3000,
          });
        }
        await loadContacts();
        setIsModalOpen(false);
        setEditingContact(null);
      } catch (err) {
        console.error("Failed to save contact:", err);
        toast({
          title: "Save Failed",
          description: "Error saving contact. Check console.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
    [editingContact, loadContacts, toast],
  );

  const handleDeleteClick = useCallback((id: string | number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (deletingId) {
      setLoading(true);
      try {
        await deleteContact(deletingId.toString());
        toast({
          title: "Contact Deleted",
          description: "Successfully deleted contact record.",
          variant: "warning",
          duration: 3000,
        });
        await loadContacts();
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
      } catch (err) {
        console.error("Failed to delete contact:", err);
        toast({
          title: "Delete Failed",
          description: "Error deleting contact. Check console.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  }, [deletingId, loadContacts, toast]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  }, []);

  const handleSetActive = useCallback(
    async (id: string | number) => {
      setLoading(true);
      try {
        // Set target active
        await updateContact(id.toString(), { isActive: true });
        // Set all others inactive (frontend pattern, backend update for each)
        const updates = contacts
          .filter((c) => c.id !== id && c.isActive)
          .map((c) => updateContact(c.id.toString(), { isActive: false }));
        await Promise.all(updates);
        toast({
          title: "Active Contact Set",
          description: "Successfully set active contact record.",
          variant: "success",
          duration: 3000,
        });
        await loadContacts();
      } catch (err) {
        console.error("Failed to set active contact:", err);
        toast({
          title: "Action Failed",
          description: "Error setting active contact record.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
    [contacts, loadContacts, toast],
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
