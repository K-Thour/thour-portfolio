import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "destructive" | "success" | "warning";
export type ToastTheme = "dark" | "light";

export type ToastActionElement = React.ReactElement;

export interface ToastType {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
  /** ms before auto-dismiss; 0 = never */
  duration?: number;
  open?: boolean;
}

// ─── Store / Reducer ──────────────────────────────────────────────────────────

type Action =
  | { type: "ADD"; toast: ToastType }
  | { type: "DISMISS"; id: string }
  | { type: "REMOVE"; id: string };

interface State {
  toasts: ToastType[];
}

const MAX_TOASTS = 5;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, MAX_TOASTS),
      };
    case "DISMISS":
      return {
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t,
        ),
      };
    case "REMOVE":
      return {
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
  }
}

type Listener = (state: State) => void;
const listeners: Listener[] = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

let count = 0;
function genId() {
  return `toast-${++count}`;
}

/** Imperative API — call from anywhere */
// eslint-disable-next-line react-refresh/only-export-components
export function toast({
  duration = 4000,
  ...props
}: Omit<ToastType, "id" | "open"> & { duration?: number }) {
  const id = genId();
  dispatch({ type: "ADD", toast: { ...props, id, open: true, duration } });

  if (duration > 0) {
    setTimeout(() => {
      dispatch({ type: "DISMISS", id });
      setTimeout(() => dispatch({ type: "REMOVE", id }), 300);
    }, duration);
  }

  return id;
}

// eslint-disable-next-line react-refresh/only-export-components
export function subscribeToast(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function getToastSnapshot() {
  return memoryState;
}

// ─── Theme-aware palette ──────────────────────────────────────────────────────

/**
 * Avenger (dark) — slate-900 base, red-to-yellow accents.
 * Ragnarok (light) — white/blue-50 base, blue accents.
 */
const themeVariantStyles: Record<
  ToastTheme,
  Record<ToastVariant, { container: string; accent: string }>
> = {
  // ── Avenger ──────────────────────────────────────────────────────────────
  dark: {
    default: {
      container:
        "bg-slate-900/95 text-slate-100 border border-slate-700/70 shadow-black/60",
      accent: "from-red-600 to-yellow-500",
    },
    success: {
      container:
        "bg-slate-900/95 text-emerald-300 border border-emerald-800/60 shadow-black/60",
      accent: "from-emerald-500 to-emerald-400",
    },
    warning: {
      container:
        "bg-slate-900/95 text-yellow-300 border border-yellow-700/60 shadow-black/60",
      accent: "from-yellow-500 to-amber-400",
    },
    destructive: {
      container:
        "bg-slate-900/95 text-red-300 border border-red-800/60 shadow-black/60",
      accent: "from-red-600 to-red-400",
    },
  },
  // ── Ragnarok ─────────────────────────────────────────────────────────────
  light: {
    default: {
      container:
        "bg-white/95 text-slate-700 border border-blue-100 shadow-blue-100/80",
      accent: "from-blue-500 to-blue-400",
    },
    success: {
      container:
        "bg-white/95 text-teal-700 border border-teal-200 shadow-teal-100/80",
      accent: "from-teal-500 to-blue-400",
    },
    warning: {
      container:
        "bg-white/95 text-amber-700 border border-amber-200 shadow-amber-100/80",
      accent: "from-amber-500 to-yellow-400",
    },
    destructive: {
      container:
        "bg-white/95 text-red-600 border border-red-200 shadow-red-100/80",
      accent: "from-red-500 to-rose-400",
    },
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToastContextValue {
  dismiss: (id: string) => void;
  theme: ToastTheme;
}

const ToastContext = createContext<ToastContextValue>({
  dismiss: () => {},
  theme: "dark",
});

// ─── ToastProvider ────────────────────────────────────────────────────────────

export function ToastProvider({
  children,
  theme = "dark",
}: {
  children?: ReactNode;
  theme?: ToastTheme;
}) {
  const dismiss = (id: string) => {
    dispatch({ type: "DISMISS", id });
    setTimeout(() => dispatch({ type: "REMOVE", id }), 300);
  };
  return (
    <ToastContext.Provider value={{ dismiss, theme }}>
      {children}
    </ToastContext.Provider>
  );
}

// ─── ToastViewport ────────────────────────────────────────────────────────────

/** Fixed top-center container — holds all active toasts. */
export function ToastViewport({ children }: { children?: ReactNode }) {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-[380px] max-w-[calc(100vw-2rem)]"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastProps extends Omit<
  ToastType,
  "title" | "description" | "action"
> {
  children?: ReactNode;
}

export function Toast({
  id,
  variant = "default",
  open = true,
  children,
}: ToastProps) {
  const { theme } = useContext(ToastContext);
  const ref = useRef<HTMLDivElement>(null);

  const palette = themeVariantStyles[theme][variant];

  // Slide-down from top on enter, slide-up on exit
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      el.style.opacity = "0";
      el.style.transform = "translateY(-16px) scale(0.97)";
      requestAnimationFrame(() => {
        el.style.transition =
          "opacity 220ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      });
    } else {
      el.style.transition = "opacity 180ms ease, transform 200ms ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-12px) scale(0.97)";
    }
  }, [open]);

  return (
    <div
      ref={ref}
      data-toast-id={id}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={[
        "group relative flex w-full items-start gap-3 rounded-xl overflow-hidden",
        "pl-4 pr-3 py-3 shadow-lg backdrop-blur-md font-sans",
        palette.container,
      ].join(" ")}
      style={{ opacity: 0, transform: "translateY(-16px) scale(0.97)" }}
    >
      {/* Coloured left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${palette.accent}`}
      />
      {children}
    </div>
  );
}

// ─── ToastTitle ───────────────────────────────────────────────────────────────

export function ToastTitle({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-semibold leading-tight tracking-tight ${className}`}
    >
      {children}
    </p>
  );
}

// ─── ToastDescription ─────────────────────────────────────────────────────────

export function ToastDescription({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xs opacity-75 leading-snug mt-0.5 ${className}`}>
      {children}
    </p>
  );
}

// ─── ToastClose ───────────────────────────────────────────────────────────────

export function ToastClose({
  toastId,
  className = "",
}: {
  toastId?: string;
  className?: string;
}) {
  const { dismiss } = useContext(ToastContext);

  return (
    <button
      type="button"
      aria-label="Close notification"
      onClick={() => toastId && dismiss(toastId)}
      className={[
        "ml-auto shrink-0 flex h-5 w-5 items-center justify-center rounded-sm",
        "opacity-40 hover:opacity-100 transition-opacity",
        "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1",
        className,
      ].join(" ")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
