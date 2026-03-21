import { useState } from "react";
import {
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Check,
} from "lucide-react";
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import type { RootState } from '../../../store/store';
// import { setTheme, type AppTheme } from '../../../store/slices/theme.slice';

type AppTheme = "light" | "dark";
import ConfirmModal from "../confirmModel/ConfirmModel";
import logo from "../../../public/images/logo.png";
import Button from "../../ui/button/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu/Index";

function Header() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // Using a mocked user since auth slice is disabled
  // const user = useSelector((state: RootState) => (state as any).auth?.user);

  const user = {
    name: "Admin User",
    email: "admin@management.system",
    role: { name: "Admin" },
    avatarUrl: "",
  };

  // const theme = useSelector((state: RootState) => state.theme.theme);
  const [theme, setTheme] = useState<AppTheme>("light");

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    // Dispatch logout here if auth slice was enabled
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-30">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Management System
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full mr-2 hover:bg-accent text-muted-foreground transition-colors"
                />
              }
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["light", "dark"] as AppTheme[]).map((t) => (
                <DropdownMenuItem
                  key={t}
                  onClick={() => setTheme(t)}
                  className="cursor-pointer"
                >
                  <span className="capitalize">{t}</span>
                  {theme === t && <Check size={16} className="ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 pl-2 pr-3 transition-colors border border-transparent hover:border-border/50" />
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
