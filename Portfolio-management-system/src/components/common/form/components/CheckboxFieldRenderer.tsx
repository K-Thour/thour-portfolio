import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { FormFieldConfig } from "../interface/interfaces";

interface CheckboxFieldRendererProps {
  field: AnyFieldApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldConfig: FormFieldConfig<any>;
  isDark: boolean;
}

export const CheckboxFieldRenderer: React.FC<CheckboxFieldRendererProps> = ({
  field,
  fieldConfig,
  isDark,
}) => {
  const value = field.state.value;
  const onChange = field.handleChange;

  return (
    <div className="flex items-center justify-between pt-1">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          id={fieldConfig.name as string}
          checked={value as boolean}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => onChange(e.target.checked as any)}
          className={`w-4 h-4 rounded cursor-pointer ${isDark ? "accent-red-500" : "accent-blue-600"}`}
        />
        <span
          className={`text-sm ${isDark ? "text-slate-400 group-hover:text-slate-300" : "text-black group-hover:text-slate-800"}`}
        >
          {fieldConfig.label || (fieldConfig.name as string)}
        </span>
      </label>
      {fieldConfig.bottomRightLink &&
        (fieldConfig.bottomRightLink.onClick ? (
          <button
            type="button"
            onClick={fieldConfig.bottomRightLink.onClick}
            className={`text-sm font-semibold transition-colors bg-transparent border-none cursor-pointer ${isDark ? "text-red-400 hover:text-red-300" : "text-blue-600 hover:text-blue-500"}`}
          >
            {fieldConfig.bottomRightLink.text}
          </button>
        ) : (
          <a
            href={fieldConfig.bottomRightLink.href || "#"}
            className={`text-sm font-semibold transition-colors ${isDark ? "text-red-400 hover:text-red-300" : "text-blue-600 hover:text-blue-500"}`}
          >
            {fieldConfig.bottomRightLink.text}
          </a>
        ))}
    </div>
  );
};
