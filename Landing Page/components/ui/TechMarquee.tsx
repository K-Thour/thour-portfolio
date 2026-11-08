'use client';

import React, { useState, useEffect } from 'react';
import { techService } from '@/services/techService';
import {
  Code2,
  Cpu,
  Layers,
  Database,
  Cloud,
  Box,
  Flame,
  Globe,
  Sparkles,
  Terminal,
  Zap,
  GitBranch,
} from 'lucide-react';

export interface MarqueeTechItem {
  _id?: string;
  name: string;
  category?: string;
  iconUrl?: string | { url: string } | null;
}

const DEFAULT_TECHNOLOGIES = [
  { name: 'React', category: 'Frontend', icon: Globe },
  { name: 'Next.js', category: 'Framework', icon: Zap },
  { name: 'TypeScript', category: 'Language', icon: Code2 },
  { name: 'Node.js', category: 'Backend', icon: Cpu },
  { name: 'JavaScript', category: 'Language', icon: Terminal },
  { name: 'PostgreSQL', category: 'Database', icon: Database },
  { name: 'MongoDB', category: 'Database', icon: Database },
  { name: 'Docker', category: 'DevOps', icon: Box },
  { name: 'AWS Cloud', category: 'Cloud', icon: Cloud },
  { name: 'Tailwind CSS', category: 'Framework', icon: Layers },
  { name: 'Three.js 3D', category: 'Frontend', icon: Sparkles },
  { name: 'Git & GitHub', category: 'DevOps', icon: GitBranch },
  { name: 'Redis', category: 'Database', icon: Flame },
];

function getSafeImageUrl(iconUrl?: string | { url: string } | null): string | null {
  if (!iconUrl) return null;
  if (typeof iconUrl === 'string') return iconUrl.trim() || null;
  if (typeof iconUrl === 'object' && iconUrl.url) return iconUrl.url.trim() || null;
  return null;
}

function MarqueeCard({
  item,
  index,
}: {
  item: MarqueeTechItem & { icon?: React.ComponentType<{ className?: string }> };
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getSafeImageUrl(item.iconUrl);
  const Icon = item.icon || Sparkles;

  return (
    <div
      key={`${item.name}-${index}`}
      className="apple-pressable group/item relative flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl apple-glass border border-[var(--glass-border)] hover:border-[var(--primary)] transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-[var(--glow-accent)] shrink-0 cursor-default select-none overflow-hidden"
    >
      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />

      {/* Tech Icon / Monogram */}
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-6 h-6 object-contain rounded-md shrink-0 bg-transparent"
        />
      ) : item.icon ? (
        <span className="w-6 h-6 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </span>
      ) : (
        <span className="w-6 h-6 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xs flex items-center justify-center shrink-0">
          {item.name.slice(0, 2).toUpperCase()}
        </span>
      )}

      {/* Tech Name & Subtle Category Pill */}
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-[var(--foreground)] group-hover/item:text-[var(--primary)] transition-colors">
          {item.name}
        </span>
        {item.category && (
          <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-[var(--card)]/60 text-[var(--muted-foreground)] border border-[var(--glass-border)]">
            {item.category}
          </span>
        )}
      </div>
    </div>
  );
}

export function TechMarquee({ technologies: initialTech = [] }: { technologies?: MarqueeTechItem[] } = {}) {
  const [techList, setTechList] = useState<MarqueeTechItem[]>(initialTech);

  useEffect(() => {
    if (initialTech.length === 0) {
      techService.getTechnologies().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTechList(data as MarqueeTechItem[]);
        }
      }).catch(() => {});
    }
  }, [initialTech]);

  // Use backend technologies if loaded, otherwise rich default set
  const baseItems: Array<MarqueeTechItem & { icon?: React.ComponentType<{ className?: string }> }> =
    techList && techList.length > 0 ? techList : DEFAULT_TECHNOLOGIES;

  // Duplicate items twice to achieve seamless infinite loop
  const marqueeItems = [...baseItems, ...baseItems];

  return (
    <div
      className="w-full overflow-hidden py-8 relative select-none group"
      aria-label="Technologies and tools"
    >
      {/* Edge gradient masks for smooth cinematic fade in/out */}
      <div className="absolute left-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      {/* Single Slow-Moving Cinematic Marquee (pauses gracefully on container hover) */}
      <div className="animate-marquee flex items-center gap-4 will-change-transform">
        {marqueeItems.map((item, idx) => (
          <MarqueeCard key={`${item.name}-${idx}`} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;
