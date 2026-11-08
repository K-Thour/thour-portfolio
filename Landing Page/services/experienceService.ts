import { apiClient } from './client/index.ts';
import type { Experience, Education } from '../types/api.ts';

/**
 * Service to fetch career trajectory, experience timeline, and education milestones
 */
export const experienceService = {
  /**
   * Fetches work experience and roles
   */
  async getExperience(): Promise<Experience[]> {
    const data = await apiClient.get<Experience[]>('/experience/get');
    return Array.isArray(data) ? data : [];
  },

  /**
   * Fetches educational qualifications and certifications
   */
  async getEducation(): Promise<Education[]> {
    const data = await apiClient.get<Education[]>('/education/get');
    return Array.isArray(data) ? data : [];
  },
};

