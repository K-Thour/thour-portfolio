import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export default function DropdownMenuSub({
  ...props
}: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}
