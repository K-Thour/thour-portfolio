import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CursorGlow: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const [isHovering, setIsHovering] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }
    return false;
  });

  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Target coordinates (actual mouse position)
  const targetPos = useRef({ x: -1000, y: -1000 });
  // Ambient spotlight position (responsive fluid lerp)
  const ambientPos = useRef({ x: -1000, y: -1000 });

  const ambientRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const updateVisibility = useCallback((visible: boolean) => {
    if (isVisibleRef.current !== visible) {
      isVisibleRef.current = visible;
      setIsVisible(visible);
    }
  }, []);

  // Listen for media query changes (touch / reduced motion)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const touchMql = window.matchMedia('(hover: none) and (pointer: coarse)');
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    touchMql.addEventListener?.('change', handleTouchChange);
    motionMql.addEventListener?.('change', handleMotionChange);

    return () => {
      touchMql.removeEventListener?.('change', handleTouchChange);
      motionMql.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  // Initialize off-screen position imperatively once
  useEffect(() => {
    if (coreRef.current && targetPos.current.x === -1000) {
      coreRef.current.style.transform =
        'translate3d(-1000px, -1000px, 0) translate(-50%, -50%)';
    }
    if (ambientRef.current && ambientPos.current.x === -1000) {
      ambientRef.current.style.transform =
        'translate3d(-1000px, -1000px, 0) translate(-50%, -50%)';
    }
  }, []);

  // Setup pointer tracking and converge-aware bounded RAF loop
  useEffect(() => {
    if (isTouchDevice || isReducedMotion) {
      return;
    }

    const isConverged = () => {
      const dx = Math.abs(targetPos.current.x - ambientPos.current.x);
      const dy = Math.abs(targetPos.current.y - ambientPos.current.y);
      return dx < 0.1 && dy < 0.1;
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        rafId.current = null;
        return;
      }

      // Fluid ambient lerp (0.3 for lively floating spotlight)
      ambientPos.current.x +=
        (targetPos.current.x - ambientPos.current.x) * 0.3;
      ambientPos.current.y +=
        (targetPos.current.y - ambientPos.current.y) * 0.3;

      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Pause bounded RAF loop once coordinates have converged to save CPU cycles
      if (isConverged()) {
        ambientPos.current.x = targetPos.current.x;
        ambientPos.current.y = targetPos.current.y;
        if (ambientRef.current) {
          ambientRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0) translate(-50%, -50%)`;
        }
        rafId.current = null;
        return;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (rafId.current === null && isVisibleRef.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      updateVisibility(true);

      // Instant 1:1 zero-lag tracking for the center core using hardware-accelerated translate3d
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check if cursor is over interactive elements, excluding disabled / aria-disabled elements
      const target = e.target;
      if (
        target &&
        'closest' in target &&
        typeof (target as Element).closest === 'function'
      ) {
        const interactiveEl = (target as Element).closest(
          'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])',
        );
        if (interactiveEl) {
          const isDisabled =
            (typeof interactiveEl.matches === 'function' &&
              interactiveEl.matches(':disabled, [aria-disabled="true"]')) ||
            interactiveEl.hasAttribute('disabled');
          setIsHovering(!isDisabled);
        } else {
          setIsHovering(false);
        }
      } else {
        setIsHovering(false);
      }

      startAnimation();
    };

    const handleMouseLeave = () => {
      updateVisibility(false);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const handleMouseEnter = () => {
      updateVisibility(true);
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateVisibility(false);
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isTouchDevice, isReducedMotion, updateVisibility]);

  if (isTouchDevice || isReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      data-testid="cursor-glow-container"
      className={`fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-300 motion-reduce:hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Large Ambient Spotlight Glow (~700px radius) */}
      <div
        ref={ambientRef}
        data-testid="cursor-glow-ambient"
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-3xl will-change-transform pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.24) 0%, rgba(234, 179, 8, 0.13) 40%, rgba(220, 38, 38, 0.04) 65%, rgba(0, 0, 0, 0) 80%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.20) 0%, rgba(96, 165, 250, 0.11) 45%, rgba(147, 197, 253, 0.04) 65%, rgba(255, 255, 255, 0) 80%)',
          opacity: isHovering ? 0.95 : 0.75,
        }}
      />

      {/* Instant 1:1 Center Core Halo (Zero Lag) */}
      <div
        ref={coreRef}
        data-testid="cursor-glow-core"
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
        }}
      />
    </div>
  );
};
