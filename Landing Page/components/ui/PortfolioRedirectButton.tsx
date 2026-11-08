'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { config } from '@/config/index';
import { cn } from '@/utils/cn';

export interface PortfolioRedirectButtonProps {
  className?: string;
  variant?: 'primary' | 'glass' | 'nav';
  label?: string;
  showIcon?: boolean;
}

export function PortfolioRedirectButton({
  className,
  variant = 'glass',
  label = 'Live Portfolio',
  showIcon = true,
}: PortfolioRedirectButtonProps) {
  const baseClasses =
    'apple-pressable apple-focus-ring inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none';

  const variantClasses = {
    primary:
      'px-5 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:shadow-cyan-500/25 text-xs sm:text-sm font-semibold',
    glass:
      'px-4 py-2 rounded-full apple-glass text-[var(--foreground)] hover:border-[var(--primary)] text-xs sm:text-sm',
    nav:
      'px-3 py-1.5 rounded-full text-xs bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--glass-border)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
  };

  return (
    <a
      href={config.portfolioUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open Karan's portfolio application (${label}) in a new tab`}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <span>{label}</span>
      {showIcon && <ExternalLink className="w-3.5 h-3.5 opacity-80" />}
    </a>
  );
}

export default PortfolioRedirectButton;

