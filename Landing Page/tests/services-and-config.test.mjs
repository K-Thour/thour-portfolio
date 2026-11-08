import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config/index.ts';
import {
  apiClient,
  userService,
  projectService,
  serviceService,
  techService,
  experienceService,
  normalizeService,
} from '../services/index.ts';

test('AppConfig: resolves environment variables with fallback defaults', () => {
  assert.ok(config.apiUrl, 'apiUrl must be defined');
  assert.ok(config.portfolioUrl, 'portfolioUrl must be defined');
  assert.equal(typeof config.apiUrl, 'string');
  assert.equal(typeof config.portfolioUrl, 'string');
  assert.match(config.portfolioUrl, /https:\/\/thour-portfolio\.netlify\.app|http/);
});

test('userService.getPublicUser: calls /user/public and returns PublicUser', async () => {
  const mockUser = {
    name: 'Karan Thour',
    email: 'karan@example.com',
    experience: 5,
    completedProjects: 25,
    solvedProblems: 500,
    happyClients: 20,
  };

  const originalAdapter = apiClient.rawInstance.defaults.adapter;
  apiClient.rawInstance.defaults.adapter = async (cfg) => {
    assert.equal(cfg.url, '/user/public');
    return {
      data: { success: true, data: mockUser },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: cfg,
    };
  };

  try {
    const user = await userService.getPublicUser();
    assert.deepEqual(user, mockUser);
  } finally {
    apiClient.rawInstance.defaults.adapter = originalAdapter;
  }
});

test('projectService.getProjects: calls /project/get and returns Project[]', async () => {
  const mockProjects = [
    { _id: 'proj_1', title: 'Next.js Portfolio', category: 'Full Stack' },
    { _id: 'proj_2', title: 'Cloud Automation', category: 'DevOps' },
  ];

  const originalAdapter = apiClient.rawInstance.defaults.adapter;
  apiClient.rawInstance.defaults.adapter = async (cfg) => {
    assert.equal(cfg.url, '/project/get');
    return {
      data: { success: true, data: mockProjects },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: cfg,
    };
  };

  try {
    const projects = await projectService.getProjects();
    assert.deepEqual(projects, mockProjects);
    assert.equal(projects.length, 2);
  } finally {
    apiClient.rawInstance.defaults.adapter = originalAdapter;
  }
});

test('serviceService.normalizeService: unpacks JSON decription blobs and formats technologies', () => {
  const rawWithJson = {
    _id: 'svc_1',
    name: 'Full Stack Engineering',
    decription: JSON.stringify({
      description: 'Parsed short description',
      features: ['SSR', 'TypeScript'],
      pricing: '$1,000',
    }),
    technologies: [
      { _id: 't1', name: 'React', category: 'Frontend', iconUrl: { url: 'https://img/react.png' } },
    ],
  };

  const normalized = normalizeService(rawWithJson);
  assert.equal(normalized.title, 'Full Stack Engineering');
  assert.equal(normalized.description, 'Parsed short description');
  assert.deepEqual(normalized.features, ['SSR', 'TypeScript']);
  assert.equal(normalized.pricing, '$1,000');
  assert.equal(normalized.technologies.length, 1);
  assert.equal(normalized.technologies[0].name, 'React');
  assert.equal(normalized.technologies[0].iconUrl, 'https://img/react.png');

  // Plain string description without JSON
  const rawPlain = {
    _id: 'svc_2',
    name: 'DevOps Consulting',
    description: 'Plain description string',
  };
  const normalizedPlain = normalizeService(rawPlain);
  assert.equal(normalizedPlain.description, 'Plain description string');
});

test('techService.getTechnologiesByCategory: groups technologies by category', async () => {
  const mockTechs = [
    { _id: 't1', name: 'React', category: 'Frontend' },
    { _id: 't2', name: 'Next.js', category: 'Frontend' },
    { _id: 't3', name: 'Node.js', category: 'Backend' },
  ];

  const originalAdapter = apiClient.rawInstance.defaults.adapter;
  apiClient.rawInstance.defaults.adapter = async (cfg) => ({
    data: { success: true, data: mockTechs },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: cfg,
  });

  try {
    const grouped = await techService.getTechnologiesByCategory();
    assert.ok(grouped.Frontend);
    assert.ok(grouped.Backend);
    assert.equal(grouped.Frontend.length, 2);
    assert.equal(grouped.Backend.length, 1);
  } finally {
    apiClient.rawInstance.defaults.adapter = originalAdapter;
  }
});

test('PortfolioRedirectButton: component exists and uses config.portfolioUrl with secure target', () => {
  const btnPath = path.resolve('components/ui/PortfolioRedirectButton.tsx');
  assert.ok(fs.existsSync(btnPath), 'PortfolioRedirectButton.tsx must exist');
  const content = fs.readFileSync(btnPath, 'utf-8');
  assert.match(content, /config\.portfolioUrl/, 'Button must source link from config');
  assert.match(content, /target="_blank"/, 'Button must open in new tab');
  assert.match(content, /rel="noopener noreferrer"/, 'Button must use secure rel attributes');
  assert.match(content, /apple-pressable/, 'Button must use tactile apple-pressable physics');
});

test('InteractiveHeroCanvas: Three.js 3D canvas adheres to Apple Design principles', () => {
  const canvasPath = path.resolve('components/3d/InteractiveHeroCanvas.tsx');
  assert.ok(fs.existsSync(canvasPath), 'InteractiveHeroCanvas.tsx must exist');
  const content = fs.readFileSync(canvasPath, 'utf-8');
  assert.match(content, /import \* as THREE from 'three'/, 'Must import Three.js');
  assert.match(content, /requestAnimationFrame/, 'Must use 60fps display synced rAF');
  assert.match(content, /prefers-reduced-motion/, 'Must respect reduced motion preferences');
  assert.match(content, /pointermove/, 'Must implement direct manipulation pointer tracking');
  assert.match(content, /dispose\(\)/, 'Must clean up WebGL geometries and materials on unmount');
});

test('ToastContext & Toast: global dispatcher and frosted glass container are declared', () => {
  const contextPath = path.resolve('context/ToastContext.tsx');
  const toastUiPath = path.resolve('components/ui/Toast.tsx');
  assert.ok(fs.existsSync(contextPath), 'ToastContext.tsx must exist');
  assert.ok(fs.existsSync(toastUiPath), 'Toast.tsx must exist');

  const contextContent = fs.readFileSync(contextPath, 'utf-8');
  assert.match(contextContent, /export function ToastProvider/, 'ToastProvider must be exported');
  assert.match(contextContent, /export function useToast/, 'useToast hook must be exported');

  const uiContent = fs.readFileSync(toastUiPath, 'utf-8');
  assert.match(uiContent, /apple-glass/, 'Toast must use apple-glass material styling');
  assert.match(uiContent, /role="alert"/, 'Toast must have accessible alert role');
});

