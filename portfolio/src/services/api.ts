import axios from 'axios';
import env from '../constants/env.constants';

const API_BASE_URL = env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global response interceptor for error handling
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  },
);

export const fetchProjects = async () => {
  const response = await apiClient.get('/project/get');
  return response.data.data;
};

export const fetchPublicUser = async () => {
  const response = await apiClient.get('/user/public');
  return response.data.data;
};

export const fetchProjectById = async (id: string, params?: any) => {
  const response = await apiClient.get(`/project/get/${id}`, { params });
  return response.data.data;
};

const normalizeService = (s: any) => {
  if (!s) return s;

  // `decription` (typo in DB) holds a JSON string with extended fields
  const rawDecription = s.decription || '';
  let extra: any = {};
  let shortDescription = rawDecription;

  if (rawDecription && rawDecription.startsWith('{')) {
    try {
      extra = JSON.parse(rawDecription);
      shortDescription =
        extra.description || extra.longDescription || rawDecription;
    } catch (e) {
      console.error('Failed to parse decription JSON:', e);
    }
  }

  // technologies from backend are ObjectId refs (not populated) — map to name strings if they have a name, else skip
  const technologies: string[] = (s.technologies || [])
    .map((t: any) => (typeof t === 'object' && t?.name ? t.name : null))
    .filter(Boolean);

  return {
    // Raw backend fields
    ...s,
    // Properly named description field (fixes the undefined bug)
    description: shortDescription,
    subtitle: extra.subtitle || extra.category || '',
    longDescription: extra.longDescription || shortDescription,
    // Features, benefits etc from the parsed JSON blob
    features: Array.isArray(extra.features) ? extra.features : [],
    benefits: Array.isArray(extra.benefits) ? extra.benefits : [],
    pricing: extra.pricing || '',
    duration: extra.duration || '',
    deliverables: Array.isArray(extra.deliverables) ? extra.deliverables : [],
    // Technologies as name strings
    technologies,
    // process doesn't exist in the backend schema — always empty
    process: [],
    // Convenience aliases used by ServiceHeader
    title: s.name || '',
    image: s.mainImageUrl?.url || '',
    icon: s.iconUrl?.url || null,
  };
};

export const fetchServices = async (params?: any) => {
  const response = await apiClient.get('/service/get', { params });
  return (response.data.data || []).map(normalizeService);
};

export const fetchServiceById = async (id: string) => {
  const response = await apiClient.get(`/service/get/${id}`);
  return normalizeService(response.data.data);
};

export const fetchTechnologies = async () => {
  const response = await apiClient.get('/technology/get');
  return response.data.data;
};

export const fetchEducation = async () => {
  const response = await apiClient.get('/education/get');
  return response.data.data;
};

export const fetchExperience = async () => {
  const response = await apiClient.get('/experience/get');
  return response.data.data;
};

export const submitContactForm = async (data: any) => {
  const response = await apiClient.post('/lead/create', data);
  return response.data;
};

export const submitLead = async (data: any) => {
  const response = await apiClient.post('/lead/create', data);
  return response.data;
};

export const fetchActiveContact = async () => {
  const response = await apiClient.get('/contact/active');
  return response.data.data;
};
