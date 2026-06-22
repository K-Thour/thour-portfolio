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

export const fetchProjectById = async (id: string) => {
  const response = await apiClient.get(`/project/get/${id}`);
  return response.data.data;
};

export const fetchServices = async (params?: any) => {
  const response = await apiClient.get('/service/get', { params });
  return response.data.data;
};

export const fetchServiceById = async (id: string) => {
  const response = await apiClient.get(`/service/get/${id}`);
  return response.data.data;
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
