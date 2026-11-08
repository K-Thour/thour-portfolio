import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('ThemeContext: exports ThemeProvider and THEME_STORAGE_KEY', () => {
  const contextPath = path.resolve('context/ThemeContext.tsx');
  assert.ok(fs.existsSync(contextPath), 'ThemeContext.tsx must exist');
  const content = fs.readFileSync(contextPath, 'utf-8');
  assert.match(content, /export const THEME_STORAGE_KEY = 'portfolio-theme'/, 'Storage key must match portfolio-theme');
  assert.match(content, /export function ThemeProvider/, 'ThemeProvider export missing');
  assert.match(content, /export function useTheme/, 'useTheme hook export missing');
});

test('ThemeToggle: accessible button with tactile press feedback and glass styling', () => {
  const togglePath = path.resolve('components/ui/ThemeToggle.tsx');
  assert.ok(fs.existsSync(togglePath), 'ThemeToggle.tsx must exist');
  const content = fs.readFileSync(togglePath, 'utf-8');
  assert.match(content, /apple-pressable/, 'ThemeToggle must use apple-pressable for tactile feedback');
  assert.match(content, /apple-glass/, 'ThemeToggle must use apple-glass');
  assert.match(content, /aria-label=/, 'ThemeToggle must have aria-label for accessibility');
  assert.match(content, /Shield.*Axe|Axe.*Shield/, 'ThemeToggle must render Shield and Axe state icons matching portfolio');
  assert.match(content, /startViewTransition/, 'ThemeToggle must implement View Transitions API');
  assert.match(content, /flushSync/, 'ThemeToggle must use flushSync for instant zero-delay state commit');
  assert.match(content, /rotate:\s*-180/, 'ThemeToggle must spin icons on transition');
  assert.match(content, /circle\(.*at.*px.*px\)/, 'ThemeToggle must animate radial circle clipPath expansion');
  assert.ok(!content.includes('if (!mounted)'), 'ThemeToggle must render icons immediately without mounted delay');
});

test('View Transition CSS: defines zero-flicker circular radial animation rules', () => {
  const animPath = path.resolve('styles/animations.css');
  const animContent = fs.readFileSync(animPath, 'utf-8');
  assert.match(animContent, /::view-transition-group\(root\)/, 'Must define view-transition-group');
  assert.match(animContent, /::view-transition-old\(root\)/, 'Must define view-transition-old');
  assert.match(animContent, /::view-transition-new\(root\)/, 'Must define view-transition-new');
  assert.match(animContent, /0\.72s/, 'Must use 0.72s animation duration');
});

test('CursorGlow: smooth rAF-based ambient glow with touch & motion checks', () => {
  const glowPath = path.resolve('components/ui/CursorGlow.tsx');
  assert.ok(fs.existsSync(glowPath), 'CursorGlow.tsx must exist');
  const content = fs.readFileSync(glowPath, 'utf-8');
  assert.match(content, /requestAnimationFrame/, 'CursorGlow must use requestAnimationFrame');
  assert.match(content, /pointer:\s*coarse/, 'CursorGlow must detect and disable on touch devices');
  assert.match(content, /prefers-reduced-motion:\s*reduce/, 'CursorGlow must respect prefers-reduced-motion');
});

test('Zero-FOUC Pre-hydration Script: embedded in layout.tsx head', () => {
  const layoutPath = path.resolve('app/layout.tsx');
  assert.ok(fs.existsSync(layoutPath), 'layout.tsx must exist');
  const content = fs.readFileSync(layoutPath, 'utf-8');
  assert.match(content, /themeInitScript/, 'layout.tsx must include pre-hydration theme script');
  assert.match(content, /portfolio-theme/, 'Pre-hydration script must inspect portfolio-theme');
  assert.match(content, /<ThemeProvider>/, 'layout.tsx must mount ThemeProvider');
  assert.match(content, /<CursorGlow\s*\/>/, 'layout.tsx must mount CursorGlow');
});

