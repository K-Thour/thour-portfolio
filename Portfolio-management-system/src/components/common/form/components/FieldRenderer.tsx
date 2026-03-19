import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { FormFieldConfig } from "../interface/interfaces";
import { CheckboxFieldRenderer } from "./CheckboxFieldRenderer";
import { InputFieldRenderer } from "./InputFieldRenderer";

interface FieldRendererProps {
  field: AnyFieldApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldConfig: FormFieldConfig<any>;
  isDark: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
  if (props.fieldConfig.render) {
    return <>{props.fieldConfig.render(props.field)}</>;
  }

  if (props.fieldConfig.type === "checkbox") {
    return <CheckboxFieldRenderer {...props} />;
  }

  return <InputFieldRenderer {...props} />;
};
