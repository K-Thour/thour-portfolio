import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import utils from "../../../../../../utils";
import { servicePricingSchema } from "../../../../../../validations/service";

const { cn } = utils.tailwindUtils;

interface DetailsStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({ form, isDark }) => {
  const deliverables = useStore(
    form.store,
    (state: any) => state.values.deliverables || [],
  );

  const handleAddDeliverable = (value: string) => {
    if (value.trim() && !deliverables.includes(value.trim())) {
      form.setFieldValue("deliverables", [...deliverables, value.trim()]);
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    form.setFieldValue(
      "deliverables",
      deliverables.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="pricing"
          validators={{
            onChange: ({ value }: { value: string }) => {
              try {
                servicePricingSchema.validateSyncAt("pricing", {
                  pricing: value,
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
                Pricing <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                  field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "",
                )}
                placeholder="$5,000 - $10,000"
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

        <form.Field
          name="duration"
          validators={{
            onChange: ({ value }: { value: string }) => {
              try {
                servicePricingSchema.validateSyncAt("duration", {
                  duration: value,
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
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                  field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "",
                )}
                placeholder="4-6 weeks"
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
      </div>

      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-gray-300" : "text-gray-800",
          )}
        >
          Deliverables (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="deliverables-input"
            className={cn(
              "flex-1 px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:ring-red-500 focus:border-red-500"
                : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
            )}
            placeholder="Source code, documentation..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddDeliverable(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "deliverables-input",
              ) as HTMLInputElement;
              if (input) {
                handleAddDeliverable(input.value);
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
        <div className="space-y-2 mt-3">
          {deliverables.map((item: string, index: number) => (
            <div
              key={index}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center justify-between",
                isDark
                  ? "bg-slate-700/50 text-white"
                  : "bg-blue-50 text-gray-900",
              )}
            >
              <span>📦 {item}</span>
              <button
                type="button"
                onClick={() => handleRemoveDeliverable(index)}
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

export default DetailsStep;
