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
    avatarUrl:
      currentUser?.image?.url ||
      (typeof currentUser?.image === "string" ? currentUser.image : ""),
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
          "h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30 transition-colors select-none",
          className,
        )}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {loading ? (
            <div className="h-6 w-48 sm:w-80 rounded-md animate-pulse bg-muted/60 flex items-center px-2">
              <span className="text-xs text-muted-foreground font-mono animate-pulse">
                Loading...
              </span>
            </div>
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg md:text-xl font-bold tracking-tight bg-linear-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent truncate max-w-[200px] sm:max-w-[380px] md:max-w-none"
            >
              {user.name ? `${user.name} CMS` : "Karanveer Thour CMS"}
            </motion.h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-full p-1 pl-1.5 pr-3 transition-all duration-150 cursor-pointer bg-accent/40 hover:bg-accent/70 active:scale-95 border border-border/30 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden ring-1 ring-border/50">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-medium leading-none tracking-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5 font-normal">
                  {user.role.name}
                </span>
              </div>
              <ChevronDown size={14} className="text-muted-foreground shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 p-1.5 rounded-xl bg-popover/90 backdrop-blur-xl border border-border/40 shadow-xl"
            >
              <div className="sm:hidden px-2.5 py-1.5 border-b border-border/30 mb-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.role.name}</p>
              </div>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="rounded-lg px-2.5 py-2 cursor-pointer font-medium text-sm flex items-center gap-2"
              >
                <User size={16} className="text-muted-foreground" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="rounded-lg px-2.5 py-2 cursor-pointer font-medium text-sm flex items-center gap-2"
              >
                <Settings size={16} className="text-muted-foreground" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-lg px-2.5 py-2 text-destructive focus:text-destructive cursor-pointer font-medium text-sm flex items-center gap-2 hover:bg-destructive/10"
                onClick={handleLogoutClick}
              >
                <LogOut size={16} />
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
