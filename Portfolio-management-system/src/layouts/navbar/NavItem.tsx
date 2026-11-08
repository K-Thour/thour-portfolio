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
          "group/nav relative flex items-center rounded-xl cursor-pointer select-none transition-all duration-150",
          "active:scale-[0.97]",
          isActive
            ? "bg-accent text-accent-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
          isOpen
            ? "w-full gap-3 px-3 py-2.5 text-sm"
            : "w-11 h-11 mx-auto justify-center",
          className,
        )
      }
      onClick={menu || undefined}
      title={!isOpen ? label : undefined}
    >
      <span
        className={cn(
          "flex items-center justify-center shrink-0 transition-transform duration-150 group-active/nav:scale-95",
          "size-5",
        )}
      >
        {icon}
      </span>
      {isOpen && (
        <span className="font-medium text-sm tracking-tight truncate">
          {label}
        </span>
      )}
    </NavLink>
  );
}

export default Navitem;
