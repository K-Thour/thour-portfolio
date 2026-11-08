import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Navbar: Experience and Contact removed from nav menu', () => {
  const navPath = path.resolve('components/navigation/Navigation.tsx');
  const content = fs.readFileSync(navPath, 'utf-8');

  // Verify NAV_ITEMS contains only 4 items: Overview, Skills, Services, Projects
  assert.match(content, /label:\s*'Overview'/);
  assert.match(content, /label:\s*'Skills'/);
  assert.match(content, /label:\s*'Services'/);
  assert.match(content, /label:\s*'Projects'/);

  // Must NOT contain Experience or Contact in NAV_ITEMS array
  const navItemsMatch = content.match(/const NAV_ITEMS:\s*NavItem\[\]\s*=\s*\[([\s\S]*?)\];/);
  assert.ok(navItemsMatch, 'NAV_ITEMS must be defined');
  const navItemsCode = navItemsMatch[1];
  assert.doesNotMatch(navItemsCode, /label:\s*'Experience'/, 'NAV_ITEMS should not have Experience');
  assert.doesNotMatch(navItemsCode, /label:\s*'Contact'/, 'NAV_ITEMS should not have Contact');
});

test('Dynamic Favicon: canvas-based circular avatar engine and layout integration', () => {
  const faviconUtilPath = path.resolve('utils/favicon.ts');
  assert.ok(fs.existsSync(faviconUtilPath), 'utils/favicon.ts must exist');
  const utilContent = fs.readFileSync(faviconUtilPath, 'utf-8');
  assert.match(utilContent, /export function createCircularAvatarFavicon/, 'Favicon generator missing');
  assert.match(utilContent, /export function updateFavicon/, 'updateFavicon DOM updater missing');
  assert.match(utilContent, /ctx\.arc/, 'Must crop circular avatar with canvas arc');

  const componentPath = path.resolve('components/ui/DynamicFavicon.tsx');
  assert.ok(fs.existsSync(componentPath), 'DynamicFavicon.tsx must exist');
  const compContent = fs.readFileSync(componentPath, 'utf-8');
  assert.match(compContent, /userService\.getPublicUser/, 'Must query backend for user avatar');
  assert.match(compContent, /MutationObserver/, 'Must observe theme changes for accent border');

  const layoutPath = path.resolve('app/layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
  assert.match(layoutContent, /<DynamicFavicon\s*\/>/, 'layout.tsx must render DynamicFavicon');
});

test('SEO & Structured Data: layout.tsx includes rich JSON-LD and metadata', () => {
  const layoutContent = fs.readFileSync(path.resolve('app/layout.tsx'), 'utf-8');
  assert.match(layoutContent, /type="application\/ld\+json"/, 'layout.tsx must include JSON-LD script');
  assert.match(layoutContent, /'@type':\s*'Person'/, 'JSON-LD must define Person schema');
  assert.match(layoutContent, /'@type':\s*'WebSite'/, 'JSON-LD must define WebSite schema');
  assert.match(layoutContent, /robots:\s*\{/, 'Metadata must specify robots directive');
  assert.match(layoutContent, /openGraph:\s*\{/, 'Metadata must specify OpenGraph tags');
});

test('Funky Visuals: TechMarquee, CinematicPerformanceGraph, and GlobalPresenceCard', () => {
  // 1. TechMarquee (single right-to-left marquee)
  const marqueePath = path.resolve('components/ui/TechMarquee.tsx');
  assert.ok(fs.existsSync(marqueePath), 'TechMarquee.tsx must exist');
  const marqueeContent = fs.readFileSync(marqueePath, 'utf-8');
  assert.match(marqueeContent, /animate-marquee/, 'Must use animate-marquee class');

  // 2. CinematicPerformanceGraph
  const graphPath = path.resolve('components/ui/CinematicPerformanceGraph.tsx');
  assert.ok(fs.existsSync(graphPath), 'CinematicPerformanceGraph.tsx must exist');
  const graphContent = fs.readFileSync(graphPath, 'utf-8');
  assert.match(graphContent, /Fast Loading|Fast Speed/, 'Must have Fast Loading metric');
  assert.match(graphContent, /Reliability/, 'Must have Reliability metric');
  assert.match(graphContent, /filter="url\(#glow\)"/, 'Must use glow SVG filter');

  // 3. GlobalPresenceCard
  const presencePath = path.resolve('components/ui/GlobalPresenceCard.tsx');
  assert.ok(fs.existsSync(presencePath), 'GlobalPresenceCard.tsx must exist');
  const presenceContent = fs.readFileSync(presencePath, 'utf-8');
  assert.match(presenceContent, /Asia\/Kolkata/, 'Must compute IST local timezone');
  assert.match(presenceContent, /Chandigarh/, 'Must display headquarters/location');

  // 4. Page mounting
  const pageContent = fs.readFileSync(path.resolve('app/page.tsx'), 'utf-8');
  assert.match(pageContent, /<TechMarquee\s*\/>/, 'page.tsx must mount TechMarquee');
  assert.match(pageContent, /<CinematicPerformanceGraph\s*\/>/, 'page.tsx must mount CinematicPerformanceGraph');
  assert.match(pageContent, /<GlobalPresenceCard\s*\/>/, 'page.tsx must mount GlobalPresenceCard');

  // 5. CSS Animations
  const animContent = fs.readFileSync(path.resolve('styles/animations.css'), 'utf-8');
  assert.match(animContent, /@keyframes marquee/, 'styles/animations.css must define marquee keyframe');
  assert.match(animContent, /45s/, 'marquee must use slow cinematic duration');
  assert.match(animContent, /\.group:hover\s+\.animate-marquee/, 'marquee must pause on container hover');
});
