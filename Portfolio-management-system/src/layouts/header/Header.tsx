import { useState, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "../../components/ui/themeToggle/ThemeToggle";
import { fetchCurrentUser, fetchPublicUser } from "../../services/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu/Index";
import { useNavigate } from "react-router-dom";
import utils from "../../utils";
import constraints from "../../constraints";
import ConfirmModal from "../../components/common/confirmModel/confirmModel";

const { cn } = utils.tailwindUtils;

function Header({ className }: { className?: string }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        setLoading(true);
        let data = null;
        if (localStorage.getItem(constraints.globalConstraints.TOKEN_KEY)) {
          try {
            data = await fetchCurrentUser();
          } catch {
            // fallback to public user
          }
        }
        if (!data) {
          data = await fetchPublicUser();
        }
        if (active && data) {
          setCurrentUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user in Header:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadUser();

    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCurrentUser((prev: any) => ({
          ...prev,
          ...customEvent.detail,
        }));
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      active = false;
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  const user = {
    name: currentUser?.name || "Karanveer Thour",
    email: currentUser?.email || "admin@management.system",
    role: { name: "Admin" },
    avatarUrl: currentUser?.image?.url || (typeof currentUser?.image === "string" ? currentUser.image : ""),
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    navigate("/login");
    localStorage.removeItem(constraints.globalConstraints.TOKEN_KEY);
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header
        className={cn(
          "h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-30",
          className,
        )}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {loading ? (
            <div className="h-6 w-48 sm:w-80 rounded-md animate-pulse bg-muted/60 flex items-center px-2">
              <span className="text-xs text-muted-foreground font-mono animate-pulse">Loading...</span>
            </div>
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg md:text-xl font-bold tracking-tight bg-linear-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent truncate max-w-[200px] sm:max-w-[380px] md:max-w-none"
            >
              {user.name ? `${user.name} CMS` : "Karanveer Thour CMS"}
            </motion.h1>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 hover:bg-accent rounded-full p-1 pl-2 pr-3 transition-colors border border-transparent hover:border-border/50" />
              }
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div className="flex flex-col items-start sm:flex">
                <span className="text-sm font-medium leading-none">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {user.role.name}
                </span>
              </div>
              <ChevronDown size={14} className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={handleLogoutClick}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
}

export default Header;
