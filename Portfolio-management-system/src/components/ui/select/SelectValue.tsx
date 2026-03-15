import { Select as SelectPrimitive } from "@base-ui/react/select";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export default function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}
