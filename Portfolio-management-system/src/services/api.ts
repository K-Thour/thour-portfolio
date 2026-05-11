import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

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
    if (error.response?.status === 401) {
      // Optional: Handle unauthorized globally (e.g. redirect to login)
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchProjects = async () => {
  const response = await apiClient.get('/project/get');
  return response.data.data;
};

export const createProject = async (data: any) => {
  const response = await apiClient.post('/project/create', data);
  return response.data.data;
};

export const updateProject = async (id: string, data: any) => {
  const response = await apiClient.patch(`/project/update/${id}`, data);
  return response.data.data;
};

export const deleteProject = async (id: string) => {
  const response = await apiClient.delete(`/project/delete/${id}`);
  return response.data.data;
};
