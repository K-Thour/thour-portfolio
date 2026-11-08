import { apiClient } from './client/index.ts';
import type { Service, ServiceTechnology } from '../types/api.ts';

/**
 * Normalizes backend service raw payloads, handling the MongoDB typo 'decription'
 * and unpacking nested JSON description strings and technology references.
 */
export function normalizeService(raw: any): Service {
  if (!raw) return raw;

  // 'decription' (typo in DB) holds an optional JSON string with extended fields
  const rawDescription = raw.decription || raw.description || '';
  let extra: any = {};
  let shortDescription = rawDescription;

  if (typeof rawDescription === 'string' && rawDescription.trim().startsWith('{')) {
    try {
      extra = JSON.parse(rawDescription);
      shortDescription =
        extra.description || extra.longDescription || rawDescription;
    } catch {
      // Fallback silently if not valid JSON
    }
  }

  // Normalize populated technologies
  const technologies: ServiceTechnology[] = (raw.technologies || [])
    .filter((t: any) => typeof t === 'object' && t?.name)
    .map((t: any) => ({
      _id: t._id,
      name: t.name,
      category: t.category || '',
      iconUrl: t.iconUrl?.url || null,
    }));

  return {
    ...raw,
    title: raw.name || '',
    description: shortDescription,
    subtitle: extra.subtitle || extra.category || '',
    longDescription: extra.longDescription || shortDescription,
    features: Array.isArray(extra.features) ? extra.features : raw.features || [],
    benefits: Array.isArray(extra.benefits) ? extra.benefits : raw.benefits || [],
    pricing: extra.pricing || raw.pricing || '',
    duration: extra.duration || raw.duration || '',
    deliverables: Array.isArray(extra.deliverables) ? extra.deliverables : raw.deliverables || [],
    technologies,
    process: Array.isArray(extra.process) ? extra.process : raw.process || [],
    image: raw.mainImageUrl?.url || '',
    icon: raw.iconUrl?.url || null,
  };
}

/**
 * Service to fetch commercial engineering services and offerings
 */
export const serviceService = {
  /**
   * Fetches all commercial service offerings, normalized for components
   */
  async getServices(): Promise<Service[]> {
    const data = await apiClient.get<any[]>('/service/get');
    return Array.isArray(data) ? data.map(normalizeService) : [];
  },

  /**
   * Fetches a single service offering by ID
   */
  async getServiceById(id: string): Promise<Service> {
    const data = await apiClient.get<any>(`/service/get/${id}`);
    return normalizeService(data);
  },
};

