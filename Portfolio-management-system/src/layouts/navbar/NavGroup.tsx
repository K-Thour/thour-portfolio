import {
  useState,
  type ReactNode,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu/Index";
import utils from "../../utils";

const { cn } = utils.tailwindUtils;

interface NavGroupProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  children: ReactNode;
  basePath?: string;
}

function NavGroup({ icon, label, isOpen, children }: NavGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const isAnyChildActive = Children.toArray(children).some((child) => {
    if (isValidElement(child)) {
      const linkTo = (child.props as { linkTo?: string }).linkTo;
      if (linkTo && (location.pathname === linkTo || location.pathname.startsWith(linkTo + "/"))) {
        return true;
      }
    }
    return false;
  });

  const toggleExpand = () => {
    if (!isOpen) return;
    setIsExpanded((prev) => !prev);
  };

  if (!isOpen) {
    return (
      <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuTrigger
          className={cn(
            "flex w-11 h-11 mx-auto items-center justify-center rounded-xl cursor-pointer select-none transition-all duration-150",
            "text-muted-foreground hover:text-foreground hover:bg-accent/50 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            (openMenu || isAnyChildActive) && "bg-accent/60 text-foreground",
          )}
          title={label}
        >
          <span className="flex items-center justify-center size-5">
            {icon}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={12}
          className="bg-popover/90 backdrop-blur-xl text-popover-foreground border border-border/40 p-1.5 rounded-xl shadow-xl min-w-44 z-50 flex flex-col gap-1"
        >
          <div className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/30 mb-1">
            {label}
          </div>
          {Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              return (
                <DropdownMenuItem
                  key={child.key || index}
                  className="p-0 focus:bg-transparent focus:outline-none cursor-pointer"
                >
                  {cloneElement(
                    child as React.ReactElement<{
                      isOpen?: boolean;
                      menu?: () => void;
                      className?: string;
                    }>,
                    {
                      isOpen: true,
                      menu: () => setOpenMenu(false),
                      className: "w-full rounded-lg px-2.5 py-2",
                    },
                  )}
                </DropdownMenuItem>
              );
            }
            return child;
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={toggleExpand}
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 w-full text-left select-none",
          "text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.98]",
          (isExpanded || isAnyChildActive) && "text-foreground font-medium",
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex items-center justify-center size-5 shrink-0">
            {icon}
          </span>
          <span className="font-medium text-sm tracking-tight truncate">
            {label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <ChevronDown size={15} className="text-muted-foreground shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="overflow-hidden flex flex-col gap-1 pl-4 border-l border-border/30 ml-4 mt-0.5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavGroup;
