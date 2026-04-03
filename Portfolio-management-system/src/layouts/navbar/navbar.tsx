import { Menu, X } from "lucide-react";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import utils from "../../utils";
const { cn } = utils.tailwindUtils;

export interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavigationItem[];
}

interface DynamicNavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: NavigationItem[];
}

function DynamicNavbar({ isOpen, setIsOpen, items }: DynamicNavbarProps) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderNavItems = (navItems: NavigationItem[]) => {
    return navItems.map((item, index) => {
      // If item has children defined
      if (item.children) {
        // Only render group if it has visible children
        if (item.children.length > 0) {
          return (
            <NavGroup
              key={`${item.title}-${index}`}
              icon={item.icon}
              label={item.title}
              isOpen={isOpen}
            >
              {renderNavItems(item.children)}
            </NavGroup>
          );
        }
        // If children array exists but is empty (e.g. filtered out by permissions), render nothing
        return null;
      }

      return (
        <NavItem
          key={`${item.title}-${index}`}
          icon={item.icon}
          label={item.title}
          linkTo={item.path}
          isOpen={isOpen}
        />
      );
    });
  };

  return (
    <div className="flex top-0 overflow-hidden max-md:fixed max-md:right-0 bottom-0 md:fixed z-50 border-2">
      <div
        className={cn(
          "h-screen bg-background/60 backdrop-blur-md text-foreground border-r border-border p-5 transition-all duration-300 flex flex-col justify-between shadow-lg",
          isOpen
            ? "w-64"
            : "w-20 max-md:bg-white/80 dark:max-md:bg-gray-900/80",
        )}
      >
        <div className="overflow-hidden">
          <button
            className={`mb-6 flex items-center ${
              isOpen ? "justify-end" : "justify-center"
            } w-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-blue-400 overflow-hidden transition-all duration-300`}
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} className="max-md:text-black" />
            )}
          </button>
          <nav
            className={`flex flex-col gap-2 overflow-y-auto overflow-x-hidden ${
              isOpen ? "" : "max-md:hidden"
            } scrollbar-hide`}
          >
            {renderNavItems(items)}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default DynamicNavbar;
