import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export default function DropdownMenuTrigger({
  ...props
}: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}
