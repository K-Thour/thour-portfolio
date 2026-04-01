import { motion } from "motion/react";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { ContactDetailsModalProps } from "../../types";
import { ContactDetailsHeader } from "./ContactDetailsHeader";
import { ContactDetailsFooter } from "./ContactDetailsFooter";
import { ContactDetailsPrimary } from "./sections/ContactDetailsPrimary";
import { ContactDetailsLocation } from "./sections/ContactDetailsLocation";
import { ContactDetailsAvailability } from "./sections/ContactDetailsAvailability";
import { ContactDetailsSocial } from "./sections/ContactDetailsSocial";

export function ContactDetailsModal({
  isOpen,
  onClose,
  contact,
}: ContactDetailsModalProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${
          isDark
            ? "bg-slate-900 border-red-500/20"
            : "bg-white border-blue-300/40 shadow-blue-500/20"
        }`}
      >
        <ContactDetailsHeader
          label={contact.label}
          isDark={isDark}
          onClose={onClose}
        />

        <div className="px-8 py-6 space-y-6">
          <ContactDetailsPrimary contact={contact} isDark={isDark} />
          <ContactDetailsLocation contact={contact} isDark={isDark} />
          <ContactDetailsAvailability contact={contact} isDark={isDark} />
          <ContactDetailsSocial contact={contact} isDark={isDark} />
        </div>

        <ContactDetailsFooter isDark={isDark} onClose={onClose} />
      </motion.div>
    </div>
  );
}
