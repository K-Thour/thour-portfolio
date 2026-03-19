import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { AvengerBackground } from "./components/AvengerBackground";
import { LightBackground } from "./components/LightBackground";
import { LoginForm } from "./components/form/LoginForm";
import { ForgotPasswordFlow } from "./components/form/ForgotPasswordFlow";
import { AnimatePresence } from "motion/react";

// Import our common CSS file for the login component
import "../../assets/styles/login.css";

export const Login: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentView, setCurrentView] = useState<"login" | "forgot-password">(
    "login",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

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
          onClick={toggleTheme}
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
