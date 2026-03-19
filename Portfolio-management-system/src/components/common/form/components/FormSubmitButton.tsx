import React from "react";
import Button from "../../../ui/button/Button";

interface FormSubmitButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  buttonClassName?: string;
  submitText?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  form,
  buttonClassName = "",
  submitText = "Submit",
}) => {
  type FormStateType = typeof form.state;
  return (
    <form.Subscribe
      selector={(state: FormStateType) => [state.canSubmit, state.isSubmitting]}
    >
      {([canSubmit, isSubmitting]: [boolean, boolean]) => (
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className={`w-full ${buttonClassName}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Authenticating...
            </span>
          ) : (
            submitText
          )}
        </Button>
      )}
    </form.Subscribe>
  );
};
