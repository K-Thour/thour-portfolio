'use client';

import React, { useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PortfolioRedirectButton } from '@/components/ui/PortfolioRedirectButton';
import { MobileDrawer, type NavItem } from './MobileDrawer';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/utils/cn';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#hero', id: 'hero' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Projects', href: '#projects', id: 'projects' },
];

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeSection = useScrollSpy(sectionIds, 120);

  return (
    <>
      <header className="fixed top-4 inset-x-0 mx-auto z-40 max-w-5xl px-4 sm:px-6 pointer-events-none">
        <div className="apple-glass-nav rounded-full px-3 sm:px-4 py-2 flex items-center justify-between shadow-lg pointer-events-auto">
          {/* Brand Monogram */}
          <a
            href="#hero"
            className="apple-pressable apple-focus-ring flex items-center gap-2.5 rounded-full p-1 pr-3 hover:opacity-90"
            aria-label="Karan Thour Home"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
              KT
            </span>
            <span className="font-semibold text-sm hidden sm:inline-block tracking-tight">
              Karan Thour
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[var(--input-background)]/50 p-1 rounded-full border border-[var(--glass-border)]"
            aria-label="Desktop Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'apple-pressable apple-focus-ring relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Live Portfolio Redirect (Desktop) */}
            <PortfolioRedirectButton variant="nav" className="hidden sm:inline-flex" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="apple-pressable apple-focus-ring md:hidden w-10 h-10 rounded-full apple-glass flex items-center justify-center cursor-pointer"
              aria-label="Open mobile menu"
              aria-expanded={drawerOpen}
            >
              <Menu className="w-4 h-4 text-[var(--foreground)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Fluid Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        triggerRef={toggleBtnRef}
      />
    </>
  );
}

