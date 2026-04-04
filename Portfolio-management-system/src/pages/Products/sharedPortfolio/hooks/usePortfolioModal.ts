import { useState, useCallback } from "react";
import type { Portfolio, FormData } from "../types";

export function usePortfolioModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    projectIds: [],
  });

  const open = useCallback((portfolio?: Portfolio) => {
    if (portfolio) {
      setEditing(portfolio);
      setFormData({ name: portfolio.name, projectIds: portfolio.projectIds });
    } else {
      setEditing(null);
      setFormData({ name: "", projectIds: [] });
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditing(null);
    setFormData({ name: "", projectIds: [] });
  }, []);

  const toggleProject = useCallback((projectId: number) => {
    setFormData((prev) => ({
      ...prev,
      projectIds: prev.projectIds.includes(projectId)
        ? prev.projectIds.filter((id) => id !== projectId)
        : [...prev.projectIds, projectId],
    }));
  }, []);

  return { isOpen, editing, formData, open, close, setFormData, toggleProject };
}
