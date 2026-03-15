import { Button as ButtonPrimitive } from "@base-ui/react/button";

import utils from "../../../utils";
import buttonVariants from "./buttonVarients";
import type { VariantProps } from "class-variance-authority";
const { cn } = utils.tailwindUtils;

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button;
