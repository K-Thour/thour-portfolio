import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import { AvengerBackground } from "../../components/common/background/AvengerBackground";
import { LightBackground } from "../../components/common/background/LightBackground";
import type { RootState } from "../../store/store";
import { ErrorIcon } from "./components/ErrorIcon";
import { ErrorTitle } from "./components/ErrorTitle";
import { ErrorMessage } from "./components/ErrorMessage";
import { ActionButtons } from "./components/ActionButtons";
import { NavigationSuggestions } from "./components/NavigationSuggestions";
import { ErrorCode } from "./components/ErrorCode";

function NotFoundPage(): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const handleNavigateHome = () => navigate("/");
  const handleGoBack = () => navigate(-1);
  const handleNavigate = (path: string) => navigate(path);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
      }`}
    >
      {/* Animated Background */}
      {isDark ? <AvengerBackground /> : <LightBackground />}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ErrorIcon isDark={isDark} />
        <ErrorTitle isDark={isDark} />
        <ErrorMessage isDark={isDark} />
        <ActionButtons
          isDark={isDark}
          onNavigateHome={handleNavigateHome}
          onGoBack={handleGoBack}
        />
        <NavigationSuggestions isDark={isDark} onNavigate={handleNavigate} />
        <ErrorCode isDark={isDark} />
      </div>
    </div>
  );
}

export default NotFoundPage;
