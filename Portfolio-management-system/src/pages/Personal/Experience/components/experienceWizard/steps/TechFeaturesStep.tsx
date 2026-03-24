import React, { useState } from "react";
import Button from "../../../../../../components/ui/button/Button";
import utils from "../../../../../../utils";
import type { FieldTypeArray } from "../../../hooks/useExperienceForm.types";

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
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-slate-300" : "text-slate-700",
          )}
        >
          Technologies Used
        </label>
        <form.Field name="technologies">
          {(field: FieldTypeArray) => {
            const technologies: string[] = field.state.value || [];

            const addTech = () => {
              if (
                techInput.trim() &&
                !technologies.includes(techInput.trim())
              ) {
                field.handleChange([...technologies, techInput.trim()]);
                setTechInput("");
              }
            };

            const removeTech = (tech: string) => {
              field.handleChange(
                technologies.filter((t: string) => t !== tech),
              );
            };

            return (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTech())
                    }
                    placeholder="e.g. React, TypeScript"
                    className={cn(
                      "flex-1 px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                      isDark
                        ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                        : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                    )}
                  />
                  <Button
                    type="button"
                    onClick={addTech}
                    variant="outline"
                    className={cn(
                      isDark &&
                        "border-slate-600 text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm",
                        isDark
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-orange-100 text-orange-700 border border-orange-200",
                      )}
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(tech)}
                        className="hover:text-red-400"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        </form.Field>
      </div>

      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-slate-300" : "text-slate-700",
          )}
        >
          Key Achievements
        </label>
        <form.Field name="features">
          {(field: FieldTypeArray) => {
            const features: string[] = field.state.value || [];

            const addFeature = () => {
              if (
                featureInput.trim() &&
                !features.includes(featureInput.trim())
              ) {
                field.handleChange([...features, featureInput.trim()]);
                setFeatureInput("");
              }
            };

            const removeFeature = (feature: string) => {
              field.handleChange(features.filter((f: string) => f !== feature));
            };

            return (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                    placeholder="e.g. Increased performance by 40%"
                    className={cn(
                      "flex-1 px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                      isDark
                        ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                        : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                    )}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    variant="outline"
                    className={cn(
                      isDark &&
                        "border-slate-600 text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    Add
                  </Button>
                </div>
                <ul className="mt-3 space-y-2">
                  {features.map((feature: string) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-slate-700/50 text-slate-300"
                          : "bg-slate-100 text-slate-700",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {feature}
                      </span>
                      <button
                        onClick={() => removeFeature(feature)}
                        className={cn(
                          "p-1 rounded transition-colors",
                          isDark
                            ? "hover:bg-slate-600 text-slate-400"
                            : "hover:bg-slate-200 text-slate-500",
                        )}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </form.Field>
      </div>
    </div>
  );
};

export default TechFeaturesStep;
