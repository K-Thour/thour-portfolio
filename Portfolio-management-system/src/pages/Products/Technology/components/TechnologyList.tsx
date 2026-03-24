import { useAppSelector } from "../../../../hooks/useRedux";
import { categories } from "../Data/Technologies";
import { TechnologyCard } from "./TechnologyCard";
import type { Technology } from "../types";

interface TechnologyListProps {
  technologies: Technology[];
  onEdit: (tech: Technology) => void;
  onDelete: (id: number) => void;
}

export function TechnologyList({
  technologies,
  onEdit,
  onDelete,
}: TechnologyListProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === "All"
                ? isDark
                  ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                : isDark
                  ? "bg-slate-800/50 border border-red-500/20 text-gray-300 hover:border-red-500/50"
                  : "bg-white border border-blue-300/40 text-gray-700 hover:border-blue-500/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologies.map((tech, index) => (
          <TechnologyCard
            key={tech.id}
            tech={tech}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}
