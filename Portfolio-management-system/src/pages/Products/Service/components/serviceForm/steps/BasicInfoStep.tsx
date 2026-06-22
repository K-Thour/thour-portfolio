import React from "react";
import utils from "../../../../../../utils";
import { serviceBasicInfoSchema } from "../../../../../../validations/service";
import { CATEGORIES } from "../constants";

const { cn } = utils.tailwindUtils;

interface BasicInfoStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  form,
  isDark,
}) => {
  const createField = (
    name: string,
    label: string,
    placeholder: string,
    isTextarea = false,
  ) => (
    <form.Field
      name={name}
      validators={{
        onChange: ({ value }: { value: string }) => {
          try {
            serviceBasicInfoSchema.validateSyncAt(name, { [name]: value });
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
            {label} <span className="text-red-500">*</span>
          </label>
          {isTextarea ? (
            <textarea
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder={placeholder}
            />
          ) : (
            <input
              type="text"
              value={field.state.value || ""}
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
              placeholder={placeholder}
            />
          )}
          {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
            <p className="text-red-500 text-sm mt-1">
              {field.state.meta.errors.join(", ")}
            </p>
          )}
        </div>
      )}
    </form.Field>
  );

  return (
    <div className="space-y-4">
      {createField("title", "Service Title", "Full Stack Web Development")}
      {createField(
        "subtitle",
        "Subtitle",
        "Build modern, scalable applications",
      )}

      <form.Field
        name="category"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              serviceBasicInfoSchema.validateSyncAt("category", {
                category: value,
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
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
          </div>
        )}
      </form.Field>

      {createField(
        "description",
        "Short Description",
        "A brief overview of what this service offers...",
        true,
      )}
    </div>
  );
};

export default BasicInfoStep;
