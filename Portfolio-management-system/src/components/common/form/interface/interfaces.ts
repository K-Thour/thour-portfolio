import type { AnyFieldApi, DeepKeys } from "@tanstack/react-form";
import type { ReactNode } from "react";
import * as yup from "yup";

export interface FormFieldConfig<TData> {
  name: DeepKeys<TData>;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "date" | "tel" | "checkbox";
  placeholder?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  bottomRightLink?: { text: string; href: string };
  validators?: {
    onChange?: yup.AnySchema;
    onChangeAsync?: yup.AnySchema;
    onBlur?: yup.AnySchema;
    onBlurAsync?: yup.AnySchema;
    onSubmit?: yup.AnySchema;
    onSubmitAsync?: yup.AnySchema;
  };
  render?: (field: AnyFieldApi) => ReactNode;
}

export interface CommonFormProps<TData> {
  defaultValues: TData;
  onSubmit: (values: { value: TData }) => void | Promise<void>;
  fields?: FormFieldConfig<TData>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ((form: any) => ReactNode) | ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFooter?: (form: any) => ReactNode;
  submitText?: string;
  className?: string;
  buttonClassName?: string;
  schema?: yup.AnySchema;
  showSubmitButton?: boolean;
  isDark?: boolean;
}
