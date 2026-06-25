import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axe, Shield } from "lucide-react";
import { ThemeToggle } from "../components/ui/themeToggle/ThemeToggle";
import { useAppSelector } from "../hooks/useRedux";
import type { RootState } from "../store/store";
import { fetchCurrentUser, fetchPortfolios } from "../services/api";

const getDisplayNameFromValue = (value: unknown, fallback = "User") => {
  if (!value) return fallback;

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (typeof value === "object") {
    const candidate = value as Record<string, unknown>;
    const name =
      (candidate.name as string | undefined) ||
      (candidate.username as string | undefined) ||
      (candidate.fullName as string | undefined) ||
      (candidate.firstName as string | undefined) ||
      (candidate.lastName as string | undefined);

    if (typeof name === "string" && name.trim()) {
      return name.trim();
    }
  }

  return fallback;
};

const PublicHeader = ({ className }: { className?: string }) => {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";
  const { token } = useParams<{ token?: string }>();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem("token")) {
        return;
      }

      try {
        const data = await fetchCurrentUser();
        setUserName(
          getDisplayNameFromValue(
            data?.name ||
              data?.username ||
              data?.firstName ||
              data?.fullName ||
              data,
          ),
        );
      } catch {
        setUserName((current) => current || "User");
      }
    };

    void loadUser();
  }, []);

  useEffect(() => {
    const loadPortfolioOwner = async () => {
      if (!token) {
        return;
      }

      try {
        const portfolios = await fetchPortfolios();
        const portfolio = (portfolios || []).find(
          (item: any) => item._id === token,
        );
        if (portfolio) {
          setUserName((current) => {
            if (current && current !== "User") {
              return current;
            }
            return getDisplayNameFromValue(portfolio.createdBy, "User");
          });
        }
      } catch {
        // Ignore and fall back to the current user / default label.
      }
    };

    void loadPortfolioOwner();
  }, [token]);
  return (
    <header
      className={`fixed top-0 z-50 border-b backdrop-blur-xl ${
        isDark
          ? "bg-slate-900/95 border-red-500/20"
          : "bg-white/95 border-blue-300/40 shadow-md"
      } ${className || ""}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-linear-to-br from-red-600 to-yellow-500"
                  : "bg-linear-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
              }`}
            >
              {isDark ? (
                <Shield className="w-6 h-6 text-white" />
              ) : (
                <Axe className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {`${userName}'s portfolio`}
              </h1>
              <p
                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Shared Projects
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
