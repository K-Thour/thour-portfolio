import { apiClient } from './client/index.ts';
import type { Technology } from '../types/api.ts';

/**
 * Service to fetch technical skills, frameworks, and architecture competencies
 */
export const techService = {
  /**
   * Fetches all registered technologies
   */
  async getTechnologies(): Promise<Technology[]> {
    const data = await apiClient.get<Technology[]>('/technology/get');
    return Array.isArray(data) ? data : [];
  },

  /**
   * Fetches technologies grouped by their domain/category
   */
  async getTechnologiesByCategory(): Promise<Record<string, Technology[]>> {
    const technologies = await this.getTechnologies();
    const grouped: Record<string, Technology[]> = {};

    for (const tech of technologies) {
      const category = tech.category || 'Core Stack';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tech);
    }

    return grouped;
  },
};

