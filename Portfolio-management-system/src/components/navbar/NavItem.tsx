import { NavLink, useLocation } from "react-router-dom";
import utils from "../../utils";
const { cn } = utils.tailwindUtils;

interface NavitemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  menu?: () => void;
  linkTo?: string;
  className?: string;
}

function Navitem({
  icon,
  label,
  isOpen,
  menu,
  linkTo,
  className,
}: NavitemProps) {
  const location = useLocation();

  return (
    <NavLink
      to={linkTo || location.pathname}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          `flex items-center gap-4 p-3 rounded-lg cursor-pointer overflow-hidden transition-colors ${
            isActive
              ? "bg-primary/10 text-black dark:text-primary font-medium"
              : "text-gray-500 dark:text-gray-400 hover:bg-primary/10 hover:text-black dark:hover:text-primary"
          }`,
          className,
        )
      }
      onClick={menu || undefined}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
}

export default Navitem;
