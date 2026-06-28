import React from "react";

import utils from "../../../../../../utils";
import { projectDescriptionSchema } from "../../../../../../validations/project";

const { cn } = utils.tailwindUtils;

interface DescriptionStepProps {
  form: any;
  isDark: boolean;
}

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  form,
  isDark,
}) => {
  return (
    <div className="space-y-4">
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectDescriptionSchema.validateSyncAt("description", {
                description: value,
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
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="A brief overview of the project..."
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
        name="longDescription"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectDescriptionSchema.validateSyncAt("longDescription", {
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
              Long Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={6}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="Detailed description of the project, its goals, challenges, and solutions..."
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
  );
};

export default DescriptionStep;
