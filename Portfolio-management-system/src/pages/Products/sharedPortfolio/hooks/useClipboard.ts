import { useState, useCallback } from "react";

export function useClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const setCopied = useCallback((id: string | null) => {
    setCopiedId(id);
  }, []);

  return { copiedId, setCopied };
}
