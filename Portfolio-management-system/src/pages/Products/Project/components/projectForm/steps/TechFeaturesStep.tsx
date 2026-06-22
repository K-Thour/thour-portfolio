import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import utils from "../../../../../../utils";
import { projectTechSchema } from "../../../../../../validations/project";

const { cn } = utils.tailwindUtils;

interface TechFeaturesStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleAddTech = (value: string) => {
    if (value.trim() && !technologies.includes(value.trim())) {
      form.setFieldValue("technologies", [...technologies, value.trim()]);
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
              <div className="flex gap-2">
                <input
                  type="text"
                  id="tech-input"
                  className={cn(
                    "flex-1 px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                  )}
                  placeholder="React, TypeScript, etc."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById(
                      "tech-input",
                    ) as HTMLInputElement;
                    if (input) {
                      handleAddTech(input.value);
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
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-sm flex items-center gap-2",
                isDark
                  ? "bg-slate-700 text-white"
                  : "bg-blue-100 text-gray-900",
              )}
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(index)}
                className="hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
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
          {features.map((feature: string, index: number) => (
            <div
              key={index}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center justify-between",
                isDark
                  ? "bg-slate-700/50 text-white"
                  : "bg-blue-50 text-gray-900",
              )}
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="hover:text-red-500"
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
