import { ServiceCard } from "./ServiceCard";
import type { ServiceListProps } from "./types";

export function ServiceList({
  services,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
