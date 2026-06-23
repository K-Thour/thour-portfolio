import { useState } from "react";
import { categories } from "../../Data/Technologies";
import { TechnologyCard } from "../card/TechnologyCard";
import type { Technology } from "../../types";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";

interface TechnologyListProps {
  technologies: Technology[];
  onEdit: (tech: Technology) => void;
  onDelete: (id: string | number) => void;
}

export function TechnologyList({
  technologies,
  onEdit,
  onDelete,
}: TechnologyListProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTechnologies =
    selectedCategory === "All"
      ? technologies
      : technologies.filter(
          (tech) =>
            tech.category &&
            tech.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              category === selectedCategory
                ? isDark
                  ? "bg-linear-to-r from-red-600 to-yellow-500 text-white"
                  : "bg-linear-to-r from-blue-600 to-blue-500 text-white"
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
      {filteredTechnologies.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed ${
            isDark
              ? "border-slate-700 text-slate-500 bg-slate-800/10"
              : "border-slate-300 text-slate-400 bg-white shadow-lg shadow-blue-500/5"
          }`}
        >
          <p className="text-lg font-medium mb-2">
            {technologies.length === 0
              ? "No technologies yet"
              : `No ${selectedCategory} technologies found`}
          </p>
          <p className="text-sm">
            {technologies.length === 0
              ? "Start by adding your first technology"
              : "Try choosing another category or add a new technology"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechnologies.map((tech, index) => (
            <TechnologyCard
              key={tech.id}
              tech={tech}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
