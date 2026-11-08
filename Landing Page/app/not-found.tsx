import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { PortfolioRedirectButton } from '@/components/ui/PortfolioRedirectButton';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="apple-glass-card max-w-md w-full p-8 rounded-3xl border border-[var(--glass-border)] space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[var(--primary)]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--primary)] font-semibold">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Off the Trajectory
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            The route you are looking for has moved or does not exist in this deployment cluster.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="apple-pressable inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-xs shadow-md hover:shadow-cyan-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <PortfolioRedirectButton variant="nav" label="Open Portfolio" />
        </div>
      </div>
    </div>
  );
}

