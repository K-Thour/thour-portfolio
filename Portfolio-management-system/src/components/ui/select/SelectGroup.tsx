import { Select as SelectPrimitive } from "@base-ui/react/select";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export default function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}
