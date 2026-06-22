import React from "react";

import utils from "../../../../../../utils";
import { projectLinksSchema } from "../../../../../../validations/project";

const { cn } = utils.tailwindUtils;

interface LinksStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const LinksStep: React.FC<LinksStepProps> = ({ form, isDark }) => {
  return (
    <div className="space-y-4">
      <form.Field
        name="github"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectLinksSchema.validateSyncAt("github", { github: value });
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
              GitHub Repository URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="https://github.com/username/project"
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
        name="liveUrl"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectLinksSchema.validateSyncAt("liveUrl", { liveUrl: value });
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
              Live Project URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="https://project.com"
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

      <form.Field name="status">
        {(field: any) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Project Status
            </label>
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
              )}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        )}
      </form.Field>
    </div>
  );
};

export default LinksStep;
