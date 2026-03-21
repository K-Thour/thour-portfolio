import { useState } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../../ui/themeToggle/ThemeToggle";

import ConfirmModal from "../confirmModel/ConfirmModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu/Index";
import { useNavigate } from "react-router-dom";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

function Header({ className }: { className?: string }) {
  const navigate = useNavigate();

  const user = {
    name: "Admin User",
    email: "admin@management.system",
    role: { name: "Admin" },
    avatarUrl: "",
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header
        className={cn(
          "h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-30",
          className,
        )}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Management System
          </h1>
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
              <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-sm font-medium leading-none">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.role?.name || "Admin"}
                </span>
              </div>
              <ChevronDown size={14} className="text-muted-foreground" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ConfirmModal
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        confirmColor="error"
      />
    </>
  );
}

export default Header;
