import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { FormFieldConfig } from "../interface/interfaces";
import FieldWrapper from "../../../ui/fieldWrapper/FieldWrapper";
import IconInput from "../../../ui/iconInput/IconInput";
import { Input } from "../../../ui/input";

interface InputFieldRendererProps {
  field: AnyFieldApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldConfig: FormFieldConfig<any>;
  isDark: boolean;
}

export const InputFieldRenderer: React.FC<InputFieldRendererProps> = ({
  field,
  fieldConfig,
  isDark,
}) => {
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
