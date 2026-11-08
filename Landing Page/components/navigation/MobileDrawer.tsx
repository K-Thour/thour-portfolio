'use client';

import React, { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioRedirectButton } from '@/components/ui/PortfolioRedirectButton';
import { cn } from '@/utils/cn';

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  activeSection,
  triggerRef,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Keyboard Escape listener & focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef?.current?.focus();
      }
    };

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          onClose();
          triggerRef?.current?.focus();
        }}
        aria-hidden="true"
      />

      {/* Drawer Sheet */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full apple-glass-nav rounded-t-3xl p-6 shadow-2xl border-t border-[var(--glass-border)] animate-in slide-in-from-bottom duration-300 ease-out"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-sm">
              KT
            </span>
            <span className="font-semibold text-base">Navigation</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              triggerRef?.current?.focus();
            }}
            className="apple-pressable apple-focus-ring w-10 h-10 rounded-full apple-glass flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[var(--foreground)]" />
          </button>
        </div>

        <nav className="py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'apple-pressable apple-focus-ring flex items-center justify-between min-h-[48px] px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                    : 'text-[var(--foreground)] hover:bg-[var(--input-background)]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                <ArrowRight
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-1'
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="py-2">
          <PortfolioRedirectButton variant="primary" className="w-full py-3" />
        </div>

        <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <span>Karan Thour • Portfolio</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
            v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}

