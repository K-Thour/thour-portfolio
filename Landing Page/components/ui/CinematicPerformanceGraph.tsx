'use client';

import React, { useState } from 'react';
import { Zap, Smartphone, ShieldCheck, Heart } from 'lucide-react';

export function CinematicPerformanceGraph() {
  const [activeTab, setActiveTab] = useState<'speed' | 'quality' | 'responsive'>('speed');

  return (
    <div className="apple-glass-card rounded-3xl p-6 sm:p-8 border border-[var(--glass-border)] space-y-6 shadow-xl relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with simple words */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--primary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built for Speed & Simplicity</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Fast, Reliable & Easy to Use
          </h3>
        </div>

        {/* Friendly Tabs */}
        <div className="flex items-center gap-1.5 bg-[var(--input-background)]/80 p-1.5 rounded-full border border-[var(--glass-border)] text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('speed')}
            className={`apple-pressable px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'speed'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Fast Speed
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quality')}
            className={`apple-pressable px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'quality'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Clean Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('responsive')}
            className={`apple-pressable px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'responsive'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            All Screens
          </button>
        </div>
      </div>

      {/* Visual Chart Wave */}
      <div className="relative h-44 w-full rounded-2xl bg-[var(--input-background)]/30 border border-[var(--glass-border)] p-4 flex flex-col justify-between overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 500 150"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fill Area */}
          <path
            d={
              activeTab === 'speed'
                ? 'M0,110 Q70,95 120,40 T240,65 T360,25 T500,35 L500,150 L0,150 Z'
                : activeTab === 'quality'
                ? 'M0,130 Q80,100 150,50 T300,30 T420,20 T500,15 L500,150 L0,150 Z'
                : 'M0,45 Q100,42 200,40 T350,38 T500,35 L500,150 L0,150 Z'
            }
            fill="url(#chartGradient)"
          />

          {/* Stroke */}
          <path
            d={
              activeTab === 'speed'
                ? 'M0,110 Q70,95 120,40 T240,65 T360,25 T500,35'
                : activeTab === 'quality'
                ? 'M0,130 Q80,100 150,50 T300,30 T420,20 T500,15'
                : 'M0,45 Q100,42 200,40 T350,38 T500,35'
            }
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Indicator Dot */}
          <circle cx="360" cy={activeTab === 'speed' ? '25' : '20'} r="5" fill="var(--primary)" className="animate-ping" />
          <circle cx="360" cy={activeTab === 'speed' ? '25' : '20'} r="4" fill="#ffffff" />
        </svg>

        {/* Top Status */}
        <div className="relative z-10 flex items-center justify-between text-xs">
          <span className="px-3 py-1 rounded-full bg-[var(--card)]/90 text-[var(--foreground)] border border-[var(--glass-border)] font-medium shadow-xs">
            {activeTab === 'speed' && 'Page Load: Under 1 second'}
            {activeTab === 'quality' && 'Code Quality: 100% Tested & Clean'}
            {activeTab === 'responsive' && 'Experience: Smooth on Phone, Tablet & Desktop'}
          </span>
          <span className="text-[var(--muted-foreground)] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Healthy & Active
          </span>
        </div>

        {/* Simple friendly time labels */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
          <span>Morning</span>
          <span>Afternoon</span>
          <span>Evening</span>
          <span>Real-time</span>
        </div>
      </div>

      {/* 4 Simple Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast Loading</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">&lt; 1s</div>
          <div className="text-[11px] text-emerald-400 font-medium">Loads instantly</div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reliability</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">99.9%</div>
          <div className="text-[11px] text-cyan-400 font-medium">Always available</div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile Ready</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">100%</div>
          <div className="text-[11px] text-emerald-400 font-medium">Works on all phones</div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--input-background)]/50 border border-[var(--glass-border)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>User Satisfaction</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">Top Rated</div>
          <div className="text-[11px] text-purple-400 font-medium">Happy clients</div>
        </div>
      </div>
    </div>
  );
}

export default CinematicPerformanceGraph;
