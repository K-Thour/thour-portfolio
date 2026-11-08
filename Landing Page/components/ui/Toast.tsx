'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast, type ToastItem } from '@/context/ToastContext';
import { cn } from '@/utils/cn';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none"
      role="region"
      aria-label="Notification alerts"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />,
  };

  const borderAccents = {
    success: 'border-emerald-500/30',
    error: 'border-rose-500/30',
    info: 'border-cyan-500/30',
  };

  return (
    <div
      className={cn(
        'pointer-events-auto apple-glass rounded-xl p-3.5 shadow-xl flex items-start gap-3 border transition-all duration-300 animate-slide-in',
        borderAccents[toast.type]
      )}
      role="alert"
    >
      <div className="pt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-xs font-semibold text-[var(--foreground)] tracking-tight">
            {toast.title}
          </h4>
        )}
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed break-words">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="apple-pressable p-1 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default ToastContainer;

