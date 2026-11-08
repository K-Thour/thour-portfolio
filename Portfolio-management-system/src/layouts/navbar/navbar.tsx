import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

const sidebarSpring = {
  type: "spring" as const,
  damping: 28,
  stiffness: 260,
  mass: 1,
};

function DynamicNavbar({ isOpen, setIsOpen, items }: DynamicNavbarProps) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderNavItems = (navItems: NavigationItem[]) => {
    return navItems.map((item, index) => {
      // If item has children defined
      if (item.children) {
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
    <>
      {/* Mobile Floating Trigger when Sidebar is Closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            type="button"
            onClick={toggleSidebar}
            className="fixed top-3 left-3 z-40 md:hidden p-2.5 rounded-xl bg-card/80 backdrop-blur-xl border border-border/40 text-foreground shadow-md active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 256 : 80,
        }}
        transition={sidebarSpring}
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between",
          "h-screen bg-background/75 backdrop-blur-xl text-foreground",
          "border-r border-border/40 shadow-xl shadow-black/5 dark:shadow-black/20",
          "p-4 transition-colors duration-200 select-none",
          !isOpen && "max-md:-translate-x-full",
          isOpen && "max-md:translate-x-0 max-md:w-64 max-md:shadow-2xl",
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-1 min-h-[44px]">
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-sm tracking-tight text-foreground/90 pl-1"
                >
                  Portfolio CMS
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              className={cn(
                "p-2.5 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer",
                "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !isOpen && "w-full mx-auto",
              )}
              onClick={toggleSidebar}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={sidebarSpring}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden scrollbar-none py-1">
            {renderNavItems(items)}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}

export default DynamicNavbar;
