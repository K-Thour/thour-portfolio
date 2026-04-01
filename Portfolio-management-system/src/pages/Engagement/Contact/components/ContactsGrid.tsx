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
