import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { FormFieldConfig } from "../interface/interfaces";
import FieldWrapper from "../../../ui/fieldWrapper/FieldWrapper";
import IconInput from "../../../ui/iconInput/IconInput";
import { Input } from "../../../ui/input";

interface FieldRendererProps {
  field: AnyFieldApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldConfig: FormFieldConfig<any>;
  isDark: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  fieldConfig,
  isDark,
}) => {
  if (fieldConfig.render) {
    return <>{fieldConfig.render(field)}</>;
  }

  const { name } = field;
  const value = field.state.value;
  const onBlur = field.handleBlur;
  const onChange = field.handleChange;

  const errorMessage = field.state.meta.errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((err: any) =>
      typeof err === "string" ? err : err?.message || "Invalid input",
    )
    .join(", ");
  const error =
    field.state.meta.isTouched && errorMessage ? errorMessage : undefined;

  if (fieldConfig.type === "checkbox") {
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
            className={`text-sm ${isDark ? "text-slate-400 group-hover:text-slate-300" : "text-slate-600 group-hover:text-slate-800"}`}
          >
            {fieldConfig.label || (fieldConfig.name as string)}
          </span>
        </label>
        {fieldConfig.bottomRightLink && (
          <a
            href={fieldConfig.bottomRightLink.href}
            className={`text-sm font-semibold transition-colors ${isDark ? "text-red-400 hover:text-red-300" : "text-blue-600 hover:text-blue-500"}`}
          >
            {fieldConfig.bottomRightLink.text}
          </a>
        )}
      </div>
    );
  }

  return (
    <FieldWrapper
      label={fieldConfig.label || (fieldConfig.name as string)}
      error={error}
      isDark={isDark}
    >
      {fieldConfig.icon || fieldConfig.rightElement ? (
        <IconInput
          id={fieldConfig.name as string}
          name={name as string}
          type={fieldConfig.type || "text"}
          value={(value as string) || ""}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange(e.target.value as any);
          }}
          placeholder={fieldConfig.placeholder || ""}
          isDark={isDark}
          icon={fieldConfig.icon}
          rightElement={fieldConfig.rightElement}
          hasError={!!error}
        />
      ) : (
        <Input
          id={fieldConfig.name as string}
          name={name as string}
          type={fieldConfig.type || "text"}
          value={value as string | number}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val =
              fieldConfig.type === "number"
                ? Number(e.target.value)
                : e.target.value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange(val as any);
          }}
          placeholder={fieldConfig.placeholder}
        />
      )}
    </FieldWrapper>
  );
};
