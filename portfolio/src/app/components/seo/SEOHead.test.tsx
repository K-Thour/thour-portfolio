import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { SEOHead } from './SEOHead';
import { UserProvider } from '../../context/UserContext';

vi.mock('../../../services/api', () => ({
  fetchPublicUser: vi.fn().mockResolvedValue({
    name: 'Karanveer Thour',
    email: 'karan@thour.com',
    image: { url: 'https://example.com/avatar.png' },
    experience: 5,
    completedProjects: 50,
    solvedProblems: 200,
    happyClients: 30,
    hobbies: ['Full Stack Developer', 'AI Enthusiast'],
    languages: [{ name: 'English', level: 'native' }],
    GitHubURL: 'https://github.com/karan',
    LinkedInURL: 'https://linkedin.com/in/karan',
  }),
}));

describe('SEOHead Component', () => {
  beforeEach(() => {
    document.title = '';
    const oldScript = document.getElementById('seo-structured-data-script');
    if (oldScript) oldScript.remove();
  });

  it('renders and injects structured data and meta tags', async () => {
    render(
      <MemoryRouter initialEntries={['/custom']}>
        <UserProvider>
          <SEOHead
            title="Custom Page Title | Portfolio"
            description="Custom page description"
            keywords="test, keywords"
            canonicalUrl="https://karanveerthour.com/custom"
          />
        </UserProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe('Custom Page Title | Portfolio');
    });

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta?.getAttribute('content')).toBe('Custom page description');

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink?.getAttribute('href')).toBe(
      'https://karanveerthour.com/custom',
    );

    const scriptTag = document.getElementById('seo-structured-data-script');
    expect(scriptTag).not.toBeNull();
    const jsonLd = JSON.parse(scriptTag?.textContent || '[]');
    expect(Array.isArray(jsonLd)).toBe(true);
    expect(jsonLd[0]['@type']).toBe('Person');
  });
});
