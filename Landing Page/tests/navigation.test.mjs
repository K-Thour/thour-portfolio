import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Navigation: exports Navigation component with Apple capsule structure', () => {
  const navPath = path.resolve('components/navigation/Navigation.tsx');
  assert.ok(fs.existsSync(navPath), 'Navigation.tsx must exist');
  const content = fs.readFileSync(navPath, 'utf-8');
  assert.match(content, /export function Navigation/, 'Navigation export missing');
  assert.match(content, /apple-glass-nav/, 'Navigation must use apple-glass-nav');
  assert.match(content, /useScrollSpy/, 'Navigation must integrate useScrollSpy');
  assert.match(content, /MobileDrawer/, 'Navigation must mount MobileDrawer');
  assert.match(content, /ThemeToggle/, 'Navigation must include ThemeToggle');
  assert.doesNotMatch(content, />Resume<\/span>/, 'Navigation must not render resume button');
});

test('MobileDrawer: modal dialog with safe-area spacing and Escape dismissal', () => {
  const drawerPath = path.resolve('components/navigation/MobileDrawer.tsx');
  assert.ok(fs.existsSync(drawerPath), 'MobileDrawer.tsx must exist');
  const content = fs.readFileSync(drawerPath, 'utf-8');
  assert.match(content, /role="dialog"/, 'MobileDrawer must declare role="dialog"');
  assert.match(content, /aria-modal="true"/, 'MobileDrawer must declare aria-modal="true"');
  assert.match(content, /e\.key === 'Escape'/, 'MobileDrawer must handle Escape key');
  assert.match(content, /document\.body\.style\.overflow = 'hidden'/, 'MobileDrawer must lock body scroll');
  assert.match(content, /min-h-\[48px\]/, 'MobileDrawer links must meet 44px minimum touch target');
});

test('useScrollSpy: exports useScrollSpy hook for lag-free scroll tracking', () => {
  const spyPath = path.resolve('hooks/useScrollSpy.ts');
  assert.ok(fs.existsSync(spyPath), 'useScrollSpy.ts must exist');
  const content = fs.readFileSync(spyPath, 'utf-8');
  assert.match(content, /export function useScrollSpy/, 'useScrollSpy export missing');
  assert.match(content, /addEventListener\('scroll'/, 'useScrollSpy must attach scroll listener');
});

test('Layout & Page: Navigation mounted and sections configured', () => {
  const layoutContent = fs.readFileSync(path.resolve('app/layout.tsx'), 'utf-8');
  assert.match(layoutContent, /<Navigation\s*\/>/, 'layout.tsx must render Navigation');

  const pageContent = fs.readFileSync(path.resolve('app/page.tsx'), 'utf-8');
  const expectedSections = ['#hero', '#skills', '#services', '#projects', '#experience', '#contact'];
  for (const section of expectedSections) {
    const id = section.replace('#', '');
    assert.match(pageContent, new RegExp(`id="${id}"`), `Page must include section ${section}`);
  }
});

