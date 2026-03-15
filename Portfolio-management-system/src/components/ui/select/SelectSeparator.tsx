import { Select as SelectPrimitive } from "@base-ui/react/select";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export default function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
