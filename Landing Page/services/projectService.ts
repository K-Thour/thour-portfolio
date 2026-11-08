import { apiClient } from './client/index.ts';
import type { Project } from '../types/api.ts';

/**
 * Normalizes raw project DTO from backend to guarantee safe primitive strings
 * Prevents React child object errors when category is populated with {_id, name, iconUrl}
 */
export function normalizeProject(p: any): Project {
  if (!p || typeof p !== 'object') return p;

  const normalized = { ...p };

  if (typeof p.category === 'object' && p.category !== null) {
    normalized.category = p.category.name || 'Full Stack';
  }

  if (Array.isArray(p.techStack)) {
    normalized.techStack = p.techStack
      .map((t: any) =>
        typeof t === 'object' && t !== null ? t.name || '' : String(t || '')
      )
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  return normalized;
}

/**
 * Service to fetch featured engineering projects and case studies
 */
export const projectService = {
  /**
   * Fetches all active projects for the portfolio showcase
   */
  async getProjects(): Promise<Project[]> {
    const data = await apiClient.get<any[]>('/project/get');
    if (!Array.isArray(data)) return [];
    return data.map(normalizeProject);
  },

  /**
   * Fetches an individual project by ID
   */
  async getProjectById(id: string): Promise<Project> {
    const data = await apiClient.get<any>(`/project/get/${id}`);
    return normalizeProject(data);
  },
};
