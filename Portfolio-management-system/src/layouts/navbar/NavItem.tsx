import { NavLink, useLocation } from "react-router-dom";
import utils from "../../utils";
import { useAppSelector } from "../../hooks/useRedux";
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
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <NavLink
      to={linkTo || location.pathname}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "flex items-center rounded-lg cursor-pointer overflow-hidden transition-all duration-200",
          isActive
            ? isDark
              ? "bg-linear-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
            : isDark
              ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
          isOpen
            ? "justify-start w-full gap-3 p-2"
            : "justify-center w-10 h-10 mx-auto pb-1", // Perfect 40x40 square with no padding that pushes icon off-center
          className,
        )
      }
      onClick={menu || undefined}
    >
      <span
        className={cn("flex items-center justify-center", !isOpen && "w-8 h-8")}
      >
        {icon}
      </span>
      {isOpen && <span className="font-medium text-sm">{label}</span>}
    </NavLink>
  );
}

export default Navitem;
