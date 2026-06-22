import { ContactCard } from "./ContactCard";
import type { ContactsGridProps } from "../types";

export function ContactsGrid({
  contacts,
  isDark,
  onView,
  onEdit,
  onDelete,
  onSetActive,
}: ContactsGridProps) {
  if (contacts.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed ${
          isDark
            ? "border-slate-700 text-slate-500 bg-slate-800/10"
            : "border-slate-300 text-slate-400 bg-white shadow-lg shadow-blue-500/5"
        }`}
      >
        <p className="text-lg font-medium mb-2">No contact messages yet</p>
        <p className="text-sm">
          Messages sent from the portfolio contact form will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contacts.map((contact, index) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          index={index}
          isDark={isDark}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetActive={onSetActive}
        />
      ))}
    </div>
  );
}
