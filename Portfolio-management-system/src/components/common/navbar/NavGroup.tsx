import {
  useState,
  type ReactNode,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu/Index";

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

  if (!isOpen && isExpanded) {
    setIsExpanded(false);
  }

  const toggleExpand = () => {
    if (!isOpen) return;
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) {
    return (
      <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuTrigger
          className="flex w-10 h-10 mx-auto items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-primary/10 hover:text-black dark:hover:text-primary transition-colors focus:outline-none"
          title={label}
        >
          {icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={8}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-0 rounded-md shadow-md min-w-50"
        >
          {Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              return (
                <DropdownMenuItem
                  key={child.key || index}
                  className="p-0 focus:bg-transparent cursor-pointer"
                >
                  {cloneElement(
                    child as React.ReactElement<{
                      isOpen?: boolean;
                      menu?: () => void;
                      className?: string;
                    }>,
                    {
                      isOpen: true, // Force open to show label
                      menu: () => setOpenMenu(false), // Pass close handler
                      className: "w-full rounded-none px-4", // Override styles for menu
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
        onClick={toggleExpand}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors w-full text-left",
          "text-gray-500 dark:text-gray-400 hover:bg-primary/10 hover:text-black dark:hover:text-primary",
        )}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          {icon}
          <span className="font-medium text-sm whitespace-nowrap">{label}</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      <div
        className={cn(
          "flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default NavGroup;
