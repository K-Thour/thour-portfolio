import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CursorGlow: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Target coordinates (actual mouse position)
  const targetPos = useRef({ x: -1000, y: -1000 });
  // Ambient spotlight position (responsive fluid lerp)
  const ambientPos = useRef({ x: -1000, y: -1000 });

  const ambientRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-only
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant 1:1 zero-lag tracking for the center core
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check if cursor is over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])',
          ),
        );
        setIsHovering(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    // Smooth ambient background trailing loop
    const animate = () => {
      // Fluid ambient lerp (0.3 for lively floating spotlight)
      ambientPos.current.x +=
        (targetPos.current.x - ambientPos.current.x) * 0.3;
      ambientPos.current.y +=
        (targetPos.current.y - ambientPos.current.y) * 0.3;

      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-300 motion-reduce:hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Large Ambient Spotlight Glow (~700px radius) */}
      <div
        ref={ambientRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-3xl will-change-transform pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.24) 0%, rgba(234, 179, 8, 0.13) 40%, rgba(220, 38, 38, 0.04) 65%, rgba(0, 0, 0, 0) 80%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.20) 0%, rgba(96, 165, 250, 0.11) 45%, rgba(147, 197, 253, 0.04) 65%, rgba(255, 255, 255, 0) 80%)',
          transform: 'translate(-1000px, -1000px)',
          opacity: isHovering ? 0.95 : 0.75,
        }}
      />

      {/* Instant 1:1 Center Core Halo (Zero Lag) */}
      <div
        ref={coreRef}
        className={`absolute top-0 left-0 rounded-full blur-md will-change-transform pointer-events-none transition-[width,height,opacity] duration-150 ease-out ${
          isHovering ? 'w-44 h-44' : 'w-28 h-28'
        }`}
        style={{
          background: isDark
            ? isHovering
              ? 'radial-gradient(circle, rgba(250, 204, 21, 0.6) 0%, rgba(239, 68, 68, 0.45) 45%, rgba(0, 0, 0, 0) 75%)'
              : 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, rgba(234, 179, 8, 0.3) 45%, rgba(0, 0, 0, 0) 75%)'
            : isHovering
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(96, 165, 250, 0.4) 45%, rgba(255, 255, 255, 0) 75%)'
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(147, 197, 253, 0.25) 45%, rgba(255, 255, 255, 0) 75%)',
          transform: 'translate(-1000px, -1000px)',
        }}
      />
    </div>
  );
};
