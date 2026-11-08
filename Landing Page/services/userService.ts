import { apiClient } from './client/index.ts';
import type { PublicUser } from '../types/api.ts';

/**
 * Service to fetch public portfolio profile and metrics
 */
export const userService = {
  /**
   * Fetches the public persona and impact counters for the hero and profile sections
   */
  async getPublicUser(): Promise<PublicUser> {
    return apiClient.get<PublicUser>('/user/public');
  },
};

