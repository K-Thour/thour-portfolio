import type { AxiosRequestConfig } from 'axios';
import { apiClient } from './axiosClient.ts';

export * from './axiosClient.ts';

/**
 * Re-exported typed HTTP verb helpers bound to the singleton apiClient
 */
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.get<T>(url, config);

export const post = <T, B = unknown>(
  url: string,
  data?: B,
  config?: AxiosRequestConfig
): Promise<T> => apiClient.post<T, B>(url, data, config);

export const patch = <T, B = unknown>(
  url: string,
  data?: B,
  config?: AxiosRequestConfig
): Promise<T> => apiClient.patch<T, B>(url, data, config);

export const put = <T, B = unknown>(
  url: string,
  data?: B,
  config?: AxiosRequestConfig
): Promise<T> => apiClient.put<T, B>(url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.delete<T>(url, config);

export { del as delete };
