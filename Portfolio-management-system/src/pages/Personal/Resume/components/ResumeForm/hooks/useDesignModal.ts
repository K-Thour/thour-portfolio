import { useState, useCallback } from "react";
import type { DesignFormData, DesignModalType } from "../types";
import type { ResumeDesignType } from "../../../types";

export function useDesignModal(
  onSelect: (type: ResumeDesignType, code?: string) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<DesignModalType>("file");
  const [formData, setFormData] = useState<DesignFormData>({
    name: "",
    file: undefined,
    latexCode: "",
  });
  const open = useCallback(() => {
    setFormData({ name: "", file: undefined, latexCode: "" });
    setModalType("file");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setFormData({ name: "", file: undefined, latexCode: "" });
  }, []);

  const save = useCallback(() => {
    if (!formData.name.trim()) return;
    onSelect(modalType === "file" ? "pdf" : "latex", formData.latexCode);
    close();
  }, [formData, modalType, onSelect, close]);

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFormData((p) => ({ ...p, file: f }));
  }, []);

  return {
    isOpen,
    modalType,
    formData,
    open,
    close,
    save,
    setModalType,
    setFormData,
    handleFileChange: onFile,
  };
}
