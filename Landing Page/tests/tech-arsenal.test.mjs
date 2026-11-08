import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TECH_ARSENAL_FILE = path.join(ROOT, 'components', 'ui', 'TechArsenal.tsx');

test('TechArsenal: component file exists and exports TechArsenal', () => {
  assert.ok(fs.existsSync(TECH_ARSENAL_FILE), 'TechArsenal.tsx must exist');
  const content = fs.readFileSync(TECH_ARSENAL_FILE, 'utf-8');
  assert.match(content, /export\s+function\s+TechArsenal/, 'Must export TechArsenal function');
});

test('TechArsenal: implements category filter pills and WAI-ARIA tablist', () => {
  const content = fs.readFileSync(TECH_ARSENAL_FILE, 'utf-8');
  assert.ok(content.includes('role="tablist"'), 'Must have role="tablist"');
  assert.ok(content.includes('role="tab"'), 'Must have role="tab"');
  assert.ok(content.includes('aria-selected'), 'Must have aria-selected');
  assert.ok(content.includes('activeTechCategory'), 'Must use activeTechCategory layoutId for fluid animation');
});

test('TechArsenal: supports segmented view mode toggle (Bento Grid and Marquee Stream)', () => {
  const content = fs.readFileSync(TECH_ARSENAL_FILE, 'utf-8');
  assert.ok(content.includes('Bento Grid'), 'Must offer Bento Grid view');
  assert.ok(content.includes('Marquee Stream'), 'Must offer Marquee Stream view');
  assert.ok(content.includes("viewMode === 'grid'"), 'Must toggle between grid and marquee');
});

test('TechArsenal: safely unwraps Cloudinary iconUrl object and string formats with monogram fallback', () => {
  const content = fs.readFileSync(TECH_ARSENAL_FILE, 'utf-8');
  assert.ok(content.includes('getTechImageUrl'), 'Must have safe image URL extractor');
  assert.ok(content.includes('onError'), 'Must handle image loading errors gracefully');
  assert.ok(content.includes('slice(0, 2).toUpperCase()'), 'Must render two-letter monogram fallback');
});

test('TechArsenal: includes top hairline light-catcher matching portfolio glass aesthetics', () => {
  const content = fs.readFileSync(TECH_ARSENAL_FILE, 'utf-8');
  assert.ok(content.includes('via-white/20'), 'Must include hairline highlight gradient');
  assert.ok(content.includes('backdrop-blur-xl'), 'Must use Apple glass backdrop blur');
});

