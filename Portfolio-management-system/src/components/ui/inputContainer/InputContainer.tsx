import * as React from "react";
import utils from "../../../utils";
import { Label } from "../label";
const { cn } = utils.tailwindUtils;

export interface InputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  error?: { message: string };
}

const InputContainer = React.forwardRef<HTMLDivElement, InputContainerProps>(
  ({ className, type, children, error, ...props }, ref) => (
    <div ref={ref} className={cn("mb-1", className)} {...props}>
      <Label
        htmlFor={type}
        className="block text-sm/6 text-[1rem] font-semibold ms-1"
      >
        &nbsp;{type[0].toUpperCase() + type.slice(1)}
      </Label>
      {children}
      {error?.message && (
        <p className="block mt-1 ms-2 text-sm text-red-600 sm:text-base">
          {error.message}
        </p>
      )}
    </div>
  ),
);
InputContainer.displayName = "InputContainer";

export default InputContainer;
