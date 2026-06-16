import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// Helper to extract data from ICommonResponse envelope
const unwrap = (response: any) => response.data.data;

// ─── AUTH & USER (PROFILE) API ───────────────────────────────────────────────
export const loginUser = async (data: any) => {
  const response = await apiClient.post('/user/login', {
    email: data.email,
    password: data.password, // Frontend login form uses password
  });
  return response.data; // Return full response envelope (has token and data)
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/user/me');
  return unwrap(response);
};

export const updateCurrentUser = async (data: any) => {
  const response = await apiClient.patch('/user/update', data);
  return unwrap(response);
};

// ─── PROJECT API ──────────────────────────────────────────────────────────────
export const fetchProjects = async () => {
  const response = await apiClient.get('/project/get');
  return unwrap(response);
};

export const createProject = async (data: any) => {
  const response = await apiClient.post('/project/create', data);
  return unwrap(response);
};

export const updateProject = async (id: string, data: any) => {
  const response = await apiClient.patch(`/project/update/${id}`, data);
  return unwrap(response);
};

export const deleteProject = async (id: string) => {
  const response = await apiClient.delete(`/project/delete/${id}`);
  return unwrap(response);
};

// ─── SERVICE API ──────────────────────────────────────────────────────────────
export const fetchServices = async () => {
  const response = await apiClient.get('/service/get');
  return unwrap(response);
};

export const createService = async (data: any) => {
  const response = await apiClient.post('/service/create', data);
  return unwrap(response);
};

export const updateService = async (id: string, data: any) => {
  const response = await apiClient.patch(`/service/update/${id}`, data);
  return unwrap(response);
};

export const deleteService = async (id: string) => {
  const response = await apiClient.delete(`/service/delete/${id}`);
  return unwrap(response);
};

// ─── TECHNOLOGY API ───────────────────────────────────────────────────────────
export const fetchTechnologies = async () => {
  const response = await apiClient.get('/technology/get');
  return unwrap(response);
};

export const createTechnology = async (data: any) => {
  const response = await apiClient.post('/technology/create', data);
  return unwrap(response);
};

export const updateTechnology = async (id: string, data: any) => {
  const response = await apiClient.patch(`/technology/update/${id}`, data);
  return unwrap(response);
};

export const deleteTechnology = async (id: string) => {
  const response = await apiClient.delete(`/technology/delete/${id}`);
  return unwrap(response);
};

// ─── EDUCATION API ────────────────────────────────────────────────────────────
export const fetchEducation = async () => {
  const response = await apiClient.get('/education/get');
  return unwrap(response);
};

export const createEducation = async (data: any) => {
  const response = await apiClient.post('/education/create', data);
  return unwrap(response);
};

export const updateEducation = async (id: string, data: any) => {
  const response = await apiClient.patch(`/education/update/${id}`, data);
  return unwrap(response);
};

export const deleteEducation = async (id: string) => {
  const response = await apiClient.delete(`/education/delete/${id}`);
  return unwrap(response);
};

// ─── EXPERIENCE API ───────────────────────────────────────────────────────────
export const fetchExperiences = async () => {
  const response = await apiClient.get('/experience/get');
  return unwrap(response);
};

export const createExperience = async (data: any) => {
  const response = await apiClient.post('/experience/create', data);
  return unwrap(response);
};

export const updateExperience = async (id: string, data: any) => {
  const response = await apiClient.patch(`/experience/update/${id}`, data);
  return unwrap(response);
};

export const deleteExperience = async (id: string) => {
  const response = await apiClient.delete(`/experience/delete/${id}`);
  return unwrap(response);
};

// ─── CONTACT API ──────────────────────────────────────────────────────────────
export const fetchContacts = async () => {
  const response = await apiClient.get('/contact/get');
  return unwrap(response);
};

export const createContact = async (data: any) => {
  const response = await apiClient.post('/contact/create', data);
  return unwrap(response);
};

export const updateContact = async (id: string, data: any) => {
  const response = await apiClient.patch(`/contact/update/${id}`, data);
  return unwrap(response);
};

export const deleteContact = async (id: string) => {
  const response = await apiClient.delete(`/contact/delete/${id}`);
  return unwrap(response);
};

export const fetchActiveContact = async () => {
  const response = await apiClient.get('/contact/active');
  return unwrap(response);
};

// ─── LEAD API ─────────────────────────────────────────────────────────────────
export const fetchLeads = async () => {
  const response = await apiClient.get('/lead/get');
  return unwrap(response);
};

export const deleteLead = async (id: string) => {
  const response = await apiClient.delete(`/lead/delete/${id}`);
  return unwrap(response);
};

export const updateLead = async (id: string, data: any) => {
  const response = await apiClient.patch(`/lead/update/${id}`, data);
  return unwrap(response);
};

// ─── RESUME API ───────────────────────────────────────────────────────────────
export const fetchResumes = async () => {
  const response = await apiClient.get('/resume/get');
  return unwrap(response);
};

export const createResume = async (data: any) => {
  const response = await apiClient.post('/resume/create', data);
  return unwrap(response);
};

export const updateResume = async (id: string, data: any) => {
  const response = await apiClient.patch(`/resume/update/${id}`, data);
  return unwrap(response);
};

export const deleteResume = async (id: string) => {
  const response = await apiClient.delete(`/resume/delete/${id}`);
  return unwrap(response);
};

export const generateResumeAI = async (data: { name: string; description: string; jobLink?: string }) => {
  const response = await apiClient.post('/resume/generate', data);
  return unwrap(response);
};

// ─── PORTFOLIO API ────────────────────────────────────────────────────────────
export const fetchPortfolios = async () => {
  const response = await apiClient.get('/portfolio/get');
  return unwrap(response);
};

export const createPortfolio = async (data: any) => {
  const response = await apiClient.post('/portfolio/create', data);
  return unwrap(response);
};

export const updatePortfolio = async (id: string, data: any) => {
  const response = await apiClient.patch(`/portfolio/update/${id}`, data);
  return unwrap(response);
};

export const deletePortfolio = async (id: string) => {
  const response = await apiClient.delete(`/portfolio/delete/${id}`);
  return unwrap(response);
};
