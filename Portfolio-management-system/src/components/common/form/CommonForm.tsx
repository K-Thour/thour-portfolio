import { useForm } from "@tanstack/react-form";
import type { CommonFormProps } from "./interface/interfaces";
import { FieldRenderer } from "./components/FieldRenderer";
import { FormSubmitButton } from "./components/FormSubmitButton";

export function CommonForm<TData>({
  defaultValues,
  fields = [],
  onSubmit,
  children,
  customFooter,
  submitText = "Submit",
  className = "",
  buttonClassName = "",
  schema,
  showSubmitButton = true,
  isDark = false,
}: CommonFormProps<TData>) {
  const form = useForm({
    defaultValues,
    onSubmit,
    asyncDebounceMs: 500,
    validators: schema
      ? {
          onChangeAsync: schema,
        }
      : undefined,
  });

  return (
    <form
      className={`space-y-6 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* 1. Render auto-generated fields if provided */}
      {fields.length > 0 && (
        <div className="space-y-4">
          {fields.map((fieldConfig) => (
            <form.Field
              key={fieldConfig.name as string}
              name={fieldConfig.name}
              validators={fieldConfig.validators}
            >
              {(field) => (
                <FieldRenderer
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  field={field as any}
                  fieldConfig={fieldConfig}
                  isDark={isDark}
                />
              )}
            </form.Field>
          ))}
        </div>
      )}

      {/* 2. Render custom children if provided */}
      {typeof children === "function" ? children(form) : children}
      {customFooter && customFooter(form)}

      {/* 3. Render default submit button if enabled */}
      {showSubmitButton && (
        <FormSubmitButton
          form={form}
          submitText={submitText}
          buttonClassName={buttonClassName}
        />
      )}
    </form>
  );
}
