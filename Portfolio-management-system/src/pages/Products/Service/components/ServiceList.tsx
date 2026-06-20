import { ServiceCard } from "./ServiceCard";
import type { ServiceListProps } from "./types";
import { useAppSelector } from "../../../../hooks/useRedux";
import utils from "../../../../utils";

const { cn } = utils.tailwindUtils;

export function ServiceList({
  services,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceListProps) {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  if (services.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed",
          isDark
            ? "border-slate-700 text-slate-500 bg-slate-800/10"
            : "border-slate-300 text-slate-400 bg-white shadow-lg shadow-blue-500/5",
        )}
      >
        <p className="text-lg font-medium mb-2">No services yet</p>
        <p className="text-sm">Start by adding your first service</p>
      </div>
    );
  }

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
