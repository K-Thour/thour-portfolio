import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const STYLES_DIR = path.resolve('styles');

test('Isolated Styles Architecture: all required CSS files exist in styles/', () => {
  const expectedFiles = [
    'theme.css',
    'colors.css',
    'glass.css',
    'animations.css',
    'globals.css',
  ];

  for (const file of expectedFiles) {
    const filePath = path.join(STYLES_DIR, file);
    assert.ok(fs.existsSync(filePath), `Expected stylesheet missing: ${file}`);
  }
});

test('Theme Definitions: Avengers Dark and Norse Light modes are defined', () => {
  const themeCss = fs.readFileSync(path.join(STYLES_DIR, 'theme.css'), 'utf-8');
  assert.match(themeCss, /:root,\s*\[data-theme='norse'\]/, 'Norse theme selector missing');
  assert.match(themeCss, /\.dark,\s*\[data-theme='avengers'\]/, 'Avengers dark theme selector missing');

  // Verify critical tokens
  const tokens = ['--background', '--foreground', '--primary', '--border', '--glass-bg', '--glass-border', '--glow-accent'];
  for (const token of tokens) {
    assert.ok(themeCss.includes(token), `Missing theme token: ${token}`);
  }
});

test('Apple Glass Materials: WWDC fluid glass tokens & hairline borders are present', () => {
  const glassCss = fs.readFileSync(path.join(STYLES_DIR, 'glass.css'), 'utf-8');
  assert.match(glassCss, /backdrop-filter:\s*blur\(20px\)\s*saturate\(180%\)/, 'Apple frosted glass blur missing');
  assert.match(glassCss, /\.apple-glass-card/, 'Apple glass card utility missing');
  assert.match(glassCss, /\.apple-glass-nav/, 'Apple glass navigation utility missing');
});

test('Apple Physics & Tactile Feedback: pressable scale and reduced-motion are defined', () => {
  const animCss = fs.readFileSync(path.join(STYLES_DIR, 'animations.css'), 'utf-8');
  assert.match(animCss, /transform:\s*scale\(0\.97\)/, 'Apple pressable scale: 0.97 missing');
  assert.match(animCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'Accessibility reduced-motion override missing');
});

test('CSS Folder Isolation: No stray CSS files exist outside styles/', () => {
  function checkDirForCss(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'styles') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        checkDirForCss(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.css')) {
        assert.fail(`Found stray CSS file outside styles/: ${fullPath}`);
      }
    }
  }

  checkDirForCss(path.resolve('.'));
});

