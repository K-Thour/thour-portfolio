import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import utils from "../../../../../../utils";
import { serviceFeaturesSchema } from "../../../../../../validations/service";

const { cn } = utils.tailwindUtils;

interface FeaturesStepProps {
  form: any;
  isDark: boolean;
}

export const FeaturesStep: React.FC<FeaturesStepProps> = ({ form, isDark }) => {
  const features = useStore(
    form.store,
    (state: any) => state.values.features || [],
  );
  const benefits = useStore(
    form.store,
    (state: any) => state.values.benefits || [],
  );

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

  const handleAddBenefit = (value: string) => {
    if (value.trim() && !benefits.includes(value.trim())) {
      form.setFieldValue("benefits", [...benefits, value.trim()]);
    }
  };

  const handleRemoveBenefit = (index: number) => {
    form.setFieldValue(
      "benefits",
      benefits.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-4">
      <form.Field
        name="longDescription"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              serviceFeaturesSchema.validateSyncAt("longDescription", {
                longDescription: value,
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
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={6}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="Comprehensive description of the service, process, and what clients can expect..."
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
          </div>
        )}
      </form.Field>

      <div>
        <form.Field
          name="features"
          validators={{
            onChange: ({ value }: { value: string[] }) => {
              try {
                serviceFeaturesSchema.validateSyncAt("features", {
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
                  id="features-input"
                  className={cn(
                    "flex-1 px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                  )}
                  placeholder="Responsive design, SEO optimized..."
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
                      "features-input",
                    ) as HTMLInputElement;
                    if (input) {
                      handleAddFeature(input.value);
                      input.value = "";
                    }
                  }}
                  className={cn(
                    "px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg",
                    isDark
                      ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
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
                "px-4 py-3 rounded-lg flex items-start justify-between text-sm",
                isDark
                  ? "bg-slate-700/50 text-white"
                  : "bg-blue-50 text-gray-900",
              )}
            >
              <span className="flex-1">✓ {feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="ml-2 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-gray-300" : "text-gray-800",
          )}
        >
          Benefits (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="benefits-input"
            className={cn(
              "flex-1 px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:ring-red-500 focus:border-red-500"
                : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
            )}
            placeholder="Increased conversion rates..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddBenefit(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "benefits-input",
              ) as HTMLInputElement;
              if (input) {
                handleAddBenefit(input.value);
                input.value = "";
              }
            }}
            className={cn(
              "px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg",
              isDark
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
            )}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {benefits.map((benefit: string, index: number) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-sm flex items-center gap-2",
                isDark
                  ? "bg-slate-700 text-white"
                  : "bg-blue-100 text-gray-900",
              )}
            >
              {benefit}
              <button
                type="button"
                onClick={() => handleRemoveBenefit(index)}
                className="hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesStep;
