import { useState, useCallback } from "react";
import type { Portfolio } from "../types";

const STORAGE_KEY = "shared-portfolios";

export function usePortfolioState() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(
    null,
  );

  const addPortfolio = useCallback(
    (portfolio: Portfolio) => {
      setPortfolios((prev) => [portfolio, ...prev]);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([portfolio, ...portfolios]),
      );
    },
    [portfolios],
  );

  const updatePortfolio = useCallback(
    (id: string, updates: Partial<Portfolio>) => {
      const updated = portfolios.map((p) =>
        p.id === id ? { ...p, ...updates } : p,
      );
      setPortfolios(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [portfolios],
  );

  const deletePortfolio = useCallback((id: string) => {
    setDeleteConfirmOpen(true);
    setPortfolioToDelete(id);
  }, []);

  const removePortfolio = useCallback(
    (id: string) => {
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(portfolios.filter((p) => p.id !== id)),
      );
    },
    [portfolios],
  );

  const loadPortfolios = useCallback((data: Portfolio[]) => {
    setPortfolios(data);
  }, []);

  return {
    portfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    removePortfolio,
    loadPortfolios,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    portfolioToDelete,
    setPortfolioToDelete,
  };
}
