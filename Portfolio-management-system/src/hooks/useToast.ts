import { useEffect, useState } from "react";
import {
  toast as toastImperative,
  subscribeToast,
  getToastSnapshot,
  type ToastType,
} from "../components/ui/toast/toast";

export type { ToastType };

export function useToast() {
  const [state, setState] = useState(getToastSnapshot);

  useEffect(() => {
    // Subscribe to store updates
    return subscribeToast(setState);
  }, []);

  return {
    toasts: state.toasts,
    toast: toastImperative,
  };
}
