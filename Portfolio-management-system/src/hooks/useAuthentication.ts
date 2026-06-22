import { useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/api";

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: { name: string };
  avatarUrl?: string;
  [key: string]: unknown;
}

/**
 * A custom hook to manage and check authentication state.
 * Currently checks localStorage for a token and provides a mocked user.
 */
export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token"),
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }

        const me = await fetchCurrentUser();
        setUser({
          name: me.name,
          email: me.email,
          role: { name: "Admin" },
          avatarUrl: me.image?.url || "",
          ...me,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};
