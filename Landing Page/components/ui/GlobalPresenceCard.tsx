'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Globe2, Radio } from 'lucide-react';
import { PortfolioRedirectButton } from '@/components/ui/PortfolioRedirectButton';

export function GlobalPresenceCard() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="apple-glass-card rounded-3xl p-6 sm:p-8 border border-[var(--glass-border)] space-y-6 relative overflow-hidden text-left">
      {/* Glow highlight */}
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Radio className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span>Available for Work</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
              Location & Availability
            </h3>
          </div>
        </div>

        <PortfolioRedirectButton variant="nav" label="Open Full Portfolio" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Physical / Remote Address */}
        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Location</span>
          </div>
          <div className="text-sm font-bold text-[var(--foreground)]">
            Chandigarh, India
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            Open for remote work worldwide
          </div>
        </div>

        {/* Local Time Indicator */}
        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Local Time</span>
          </div>
          <div className="text-sm font-bold font-mono text-[var(--foreground)]">
            {currentTime || '05:30 PM (IST)'}
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            India Time (IST • UTC+05:30)
          </div>
        </div>

        {/* Direct Connect & Signal */}
        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <Globe2 className="w-4 h-4 text-purple-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Quick Response</span>
          </div>
          <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <span>Replies within a few hours</span>
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            Available via Email or Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalPresenceCard;
