import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export default function DropdownMenuPortal({
  ...props
}: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}
