import { useState } from "react";
import { categories } from "../../Data/Technologies";
import { TechnologyCard } from "../card/TechnologyCard";
import type { Technology } from "../../types";

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
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                  : "bg-card/80 hover:bg-accent/60 text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Technologies Grid */}
      {filteredTechnologies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-md text-center">
          <p className="text-lg font-semibold tracking-tight text-foreground mb-1">
            {technologies.length === 0
              ? "No technologies yet"
              : `No ${selectedCategory} technologies found`}
          </p>
          <p className="text-sm text-muted-foreground">
            {technologies.length === 0
              ? "Start by adding your first technology or framework"
              : "Try choosing another category or add a new skill"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
