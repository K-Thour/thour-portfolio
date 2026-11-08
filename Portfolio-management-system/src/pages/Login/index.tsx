import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { LoginForm } from "./components/form/LoginForm";
import { ForgotPasswordFlow } from "./components/form/ForgotPasswordFlow";
import { ThemeToggle } from "../../components/ui/themeToggle/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { AppBackground } from "../../components/common/background/AppBackground";

// Styles
import "../../assets/styles/login.css";

export const Login: React.FC = () => {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<"login" | "forgot-password">(
    "login",
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      <AppBackground />

      {/* Theme Toggle — institutional circular radial transition with axe & shield */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Auth card — spring cross-fade between login & forgot-password */}
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
