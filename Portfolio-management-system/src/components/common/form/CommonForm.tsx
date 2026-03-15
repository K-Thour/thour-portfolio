import { useForm } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";

import { Input } from "../../ui/input";
import Button from "../../ui/button/Button";
import InputContainer from "../../ui/inputContainer/InputContainer";

import type { DeepKeys } from "@tanstack/react-form";

export interface FormFieldConfig<TData> {
  name: DeepKeys<TData>;
  label: string;
  type?: "text" | "email" | "password" | "number" | "date" | "tel";
  placeholder?: string;
  validators?: {
    onChange?: yup.AnySchema;
    onChangeAsync?: yup.AnySchema;
    onBlur?: yup.AnySchema;
    onBlurAsync?: yup.AnySchema;
    onSubmit?: yup.AnySchema;
    onSubmitAsync?: yup.AnySchema;
  };
}

interface CommonFormProps<TData> {
  defaultValues: TData;
  fields: FormFieldConfig<TData>[];
  onSubmit: (values: { value: TData }) => void | Promise<void>;
  submitText?: string;
  className?: string;
}

export function CommonForm<TData>({
  defaultValues,
  fields,
  onSubmit,
  submitText = "Submit",
  className = "",
}: CommonFormProps<TData>) {
  const form = useForm({
    defaultValues,
    onSubmit,
    validatorAdapter: yupValidator(),
  } as unknown as Parameters<typeof useForm>[0]);

  return (
    <form
      className={`space-y-6 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="space-y-4">
        {fields.map((fieldConfig) => (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            validators={fieldConfig.validators}
          >
            {(field) => {
              // Extract standard input props
              const { name } = field;
              const value = field.state.value;
              const onBlur = field.handleBlur;
              const onChange = field.handleChange;

              const errorMessage = field.state.meta.errors.join(", ");
              const error =
                field.state.meta.isTouched && errorMessage
                  ? { message: errorMessage }
                  : undefined;

              return (
                <InputContainer
                  type={fieldConfig.label || fieldConfig.name}
                  error={error}
                >
                  <Input
                    id={fieldConfig.name}
                    name={name}
                    type={fieldConfig.type || "text"}
                    value={value as string | number}
                    onBlur={onBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val =
                        fieldConfig.type === "number"
                          ? Number(e.target.value)
                          : e.target.value;
                      onChange(val as unknown as typeof value);
                    }}
                    placeholder={fieldConfig.placeholder}
                  />
                </InputContainer>
              );
            }}
          </form.Field>
        ))}
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : submitText}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
