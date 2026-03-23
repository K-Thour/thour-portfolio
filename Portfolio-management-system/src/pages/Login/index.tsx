import React from "react";
import { Moon, Sun } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { AvengerBackground } from "../../components/common/background/AvengerBackground";
import { LightBackground } from "../../components/common/background/LightBackground";
import { LoginForm } from "./components/form/LoginForm";
import { ForgotPasswordFlow } from "./components/form/ForgotPasswordFlow";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleTheme } from "../../store/slices/theme.slice";

// Toast
import { useToast } from "../../hooks/useToast";

// Styles
import "../../assets/styles/login.css";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { toast } = useToast();

  const [currentView, setCurrentView] = useState<"login" | "forgot-password">(
    "login",
  );

  const isDark = theme === "dark";

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    toast({
      title: "Theme Switched",
      description: `Switched to ${isDark ? "Ragnarok" : "Avenger"} theme`,
      variant: "warning",
      duration: 5000,
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      {/* Dynamic Background Effects */}
      {isDark ? <AvengerBackground /> : <LightBackground />}

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleTheme}
          className={`rounded-full shadow-lg transition-colors ${isDark ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Shared Unified Form Component or Forgot Password Flow */}
      <AnimatePresence mode="wait">
        {currentView === "login" ? (
          <LoginForm
            key="login"
            theme={theme}
            onForgotPassword={() => setCurrentView("forgot-password")}
          />
        ) : (
          <ForgotPasswordFlow
            key="forgot-password"
            theme={theme}
            onBackToLogin={() => setCurrentView("login")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
