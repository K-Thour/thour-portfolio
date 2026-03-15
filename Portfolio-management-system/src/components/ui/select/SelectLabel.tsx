import { Select as SelectPrimitive } from "@base-ui/react/select";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export default function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
