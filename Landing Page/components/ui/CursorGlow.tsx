'use client';

import React, { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine pointer and motion is allowed
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const updateGlow = () => {
      if (glowRef.current) {
        const { x, y } = posRef.current;
        glowRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(updateGlow);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full opacity-40 z-30 transition-opacity duration-500 will-change-transform"
      style={{
        background: 'radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      aria-hidden="true"
    />
  );
}

