import type { ExperienceFormData } from "../../../../interfaces/experience/experienceForm.interface";

export type FieldType = {
  state: {
    value: string;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string) => void;
};

export type FieldTypeNull = {
  state: {
    value: string | null;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string | null) => void;
};

export type FieldTypeBool = {
  state: {
    value: boolean;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: boolean) => void;
};

export type FieldTypeArray = {
  state: {
    value: string[];
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string[]) => void;
};

export interface UseExperienceFormReturn {
  form: {
    store: {
      state: { values: ExperienceFormData };
      subscribe: (
        callback: (state: { values: ExperienceFormData }) => void,
      ) => { unsubscribe: () => void };
    };
    getFieldValue: (
      name: keyof ExperienceFormData,
    ) => ExperienceFormData[keyof ExperienceFormData];
    setFieldMeta: (
      name: keyof ExperienceFormData,
      updater: (prev: { errors: string[]; isTouched: boolean }) => {
        errors: string[];
        isTouched: boolean;
      },
    ) => void;
    handleSubmit: () => void;
    reset: (values?: Partial<ExperienceFormData>) => void;
  };
}
