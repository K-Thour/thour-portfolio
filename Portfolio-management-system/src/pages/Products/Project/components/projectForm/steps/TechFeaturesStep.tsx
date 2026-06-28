import React, { useEffect, useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import utils from "../../../../../../utils";
import { projectTechSchema } from "../../../../../../validations/project";
import { fetchTechnologies } from "../../../../../../services/api";

const { cn } = utils.tailwindUtils;

interface TechFeaturesStepProps {
  form: any;
  isDark: boolean;
}

export const TechFeaturesStep: React.FC<TechFeaturesStepProps> = ({
  form,
  isDark,
}) => {
  const technologies = useStore(
    form.store,
    (state: any) => state.values.technologies || [],
  );
  const features = useStore(
    form.store,
    (state: any) => state.values.features || [],
  );

  const [dbTechs, setDbTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTechnologies()
      .then((data) => {
        setDbTechs(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch technologies:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddTech = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      form.setFieldValue("technologies", [...technologies, trimmed]);
    }
  };

  const handleToggleTech = (techName: string) => {
    const trimmed = techName.trim();
    if (!trimmed) return;
    if (technologies.includes(trimmed)) {
      form.setFieldValue(
        "technologies",
        technologies.filter((t: string) => t !== trimmed),
      );
    } else {
      form.setFieldValue("technologies", [...technologies, trimmed]);
    }
  };

  const handleRemoveTech = (index: number) => {
    form.setFieldValue(
      "technologies",
      technologies.filter((_: any, i: number) => i !== index),
    );
  };

  const handleAddFeature = (value: string) => {
    if (value.trim() && !features.includes(value.trim())) {
      form.setFieldValue("features", [...features, value.trim()]);
    }
  };

  const handleRemoveFeature = (index: number) => {
    form.setFieldValue(
      "features",
      features.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <form.Field
          name="technologies"
          validators={{
            onChange: ({ value }: { value: string[] }) => {
              try {
                projectTechSchema.validateSyncAt("technologies", {
                  technologies: value,
                });
                return undefined;
              } catch (err: any) {
                return err.message;
              }
            },
          }}
        >
          {(field: any) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-gray-300" : "text-gray-800",
                )}
              >
                Technologies <span className="text-red-500">*</span>
              </label>

              {/* Multiselect Dropdown Container */}
              <div ref={dropdownRef} className="relative">
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-2 p-2.5 rounded-xl border bg-transparent transition-all min-h-[48px] cursor-text",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white focus-within:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/20"
                      : "bg-white border-blue-300/50 text-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
                  )}
                  onClick={() => setIsOpen(true)}
                >
                  {/* Selected Tags inside the input box */}
                  {technologies.map((tech: string, index: number) => {
                    const matchingDbTech = dbTechs.find((t) => t.name === tech);
                    return (
                      <span
                        key={index}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border shadow-xs animate-fade-in",
                          isDark
                            ? "bg-slate-800 border-red-500/10 text-white"
                            : "bg-blue-50 border-blue-100 text-blue-900",
                        )}
                      >
                        {matchingDbTech?.iconUrl?.url ? (
                          <img
                            src={matchingDbTech.iconUrl.url}
                            alt={tech}
                            className="w-3.5 h-3.5 object-contain rounded-xs flex-shrink-0"
                          />
                        ) : null}
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTech(index);
                          }}
                          className="hover:text-red-500 cursor-pointer transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}

                  {/* Real-time search/input area inside the box */}
                  <div className="flex-1 min-w-[120px] flex items-center gap-1.5">
                    <input
                      type="text"
                      id="tech-input"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                      }}
                      onFocus={() => setIsOpen(true)}
                      className="w-full bg-transparent border-0 outline-none focus:ring-0 p-0 text-sm placeholder:text-gray-500"
                      placeholder={
                        technologies.length === 0
                          ? "Select or type technologies..."
                          : ""
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (inputValue.trim()) {
                            handleAddTech(inputValue);
                            setInputValue("");
                          }
                        }
                      }}
                    />

                    {/* Add Custom Button (only visible when there is custom text) */}
                    {inputValue.trim() && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddTech(inputValue);
                          setInputValue("");
                        }}
                        className={cn(
                          "p-1 rounded-lg transition-all hover:scale-105 cursor-pointer flex-shrink-0 border",
                          isDark
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-blue-100 text-blue-600 border-blue-200",
                        )}
                        title="Add custom technology"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu List */}
                {isOpen && (
                  <div
                    className={cn(
                      "absolute top-full left-0 right-0 mt-1.5 z-30 rounded-xl border shadow-2xl max-h-60 overflow-y-auto backdrop-blur-md p-1",
                      isDark
                        ? "bg-slate-900/95 border-slate-700/80 text-white"
                        : "bg-white/95 border-gray-200 text-slate-900",
                    )}
                  >
                    {loading ? (
                      <div className="text-xs text-gray-500 p-3 text-center animate-pulse">
                        Loading technologies from database...
                      </div>
                    ) : (
                      <>
                        {dbTechs
                          .filter((t) =>
                            t.name
                              .toLowerCase()
                              .includes(inputValue.toLowerCase()),
                          )
                          .map((t) => {
                            const isSelected = technologies.includes(t.name);
                            return (
                              <button
                                key={t._id}
                                type="button"
                                onClick={() => handleToggleTech(t.name)}
                                className={cn(
                                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between cursor-pointer hover:-translate-y-[1px]",
                                  isSelected
                                    ? isDark
                                      ? "bg-red-500/15 text-red-400 font-semibold border-l-2 border-red-500"
                                      : "bg-blue-50/80 text-blue-700 font-semibold border-l-2 border-blue-500"
                                    : isDark
                                      ? "hover:bg-slate-800/80 text-gray-300"
                                      : "hover:bg-gray-50 text-gray-700",
                                )}
                              >
                                <div className="flex items-center gap-2.5">
                                  {t.iconUrl?.url ? (
                                    <img
                                      src={t.iconUrl.url}
                                      alt={t.name}
                                      className="w-4 h-4 object-contain rounded-xs"
                                    />
                                  ) : null}
                                  <span>{t.name}</span>
                                </div>
                                {isSelected && (
                                  <span
                                    className={cn(
                                      "text-xs font-bold",
                                      isDark ? "text-red-400" : "text-blue-500",
                                    )}
                                  >
                                    ✓ Selected
                                  </span>
                                )}
                              </button>
                            );
                          })}

                        {dbTechs.filter((t) =>
                          t.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()),
                        ).length === 0 && (
                          <div className="text-xs text-gray-500 p-3 italic">
                            No matching saved tech. Press Enter or click
                            &ldquo;+&rdquo; to add &ldquo;{inputValue}&rdquo; as
                            custom.
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field
          name="features"
          validators={{
            onChange: ({ value }: { value: string[] }) => {
              try {
                projectTechSchema.validateSyncAt("features", {
                  features: value,
                });
                return undefined;
              } catch (err: any) {
                return err.message;
              }
            },
          }}
        >
          {(field: any) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-gray-300" : "text-gray-800",
                )}
              >
                Key Features <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="feature-input"
                  className={cn(
                    "flex-1 px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                  )}
                  placeholder="Add a key feature"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById(
                      "feature-input",
                    ) as HTMLInputElement;
                    if (input) {
                      handleAddFeature(input.value);
                      input.value = "";
                    }
                  }}
                  className={cn(
                    "px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg",
                    isDark
                      ? "bg-linear-to-r from-red-600 to-yellow-500 text-white"
                      : "bg-linear-to-r from-blue-600 to-blue-500 text-white",
                  )}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>
        <div className="space-y-2 mt-3">
          {features.length === 0 && (
            <p
              className={cn(
                "text-sm italic",
                isDark ? "text-gray-500" : "text-gray-400",
              )}
            >
              No features added yet
            </p>
          )}
          {features.map((feature: string, index: number) => (
            <div
              key={index}
              className={cn(
                "px-4 py-2.5 rounded-xl flex items-center justify-between border shadow-xs",
                isDark
                  ? "bg-slate-800/50 border-red-500/10 text-white"
                  : "bg-blue-50/50 border-blue-100 text-gray-900",
              )}
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="hover:text-red-500 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechFeaturesStep;
