import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { toAppError, ValidationError } from '../errors/index.ts';

// Extend Axios config with custom metadata for latency tracing
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime?: number;
      requestId?: string;
    };
  }
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime?: number;
      requestId?: string;
    };
  }
}

/**
 * Generates a unique correlation ID for end-to-end request tracing
 */
export function generateRequestId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `req_${crypto.randomUUID()}`;
  }
  return `req_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
}

export class HttpClient {
  private readonly instance: AxiosInstance;
  public readonly baseURL: string;

  constructor(baseURL?: string, timeout = 10000) {
    this.baseURL =
      baseURL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:3000/api';

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // ─── Request Interceptor ────────────────────────────────────────────────
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const requestId = generateRequestId();
        config.metadata = {
          startTime: Date.now(),
          requestId,
        };

        // Attach correlation ID header
        config.headers.set('x-request-id', requestId);

        // Ensure Content-Type default
        if (!config.headers.has('Content-Type')) {
          config.headers.set('Content-Type', 'application/json');
        }

        // Client-side authentication token injection if present
        if (typeof window !== 'undefined') {
          try {
            const token = localStorage.getItem('auth-token');
            if (token) {
              config.headers.set('Authorization', `Bearer ${token}`);
            }
          } catch {
            // Silently ignore storage access errors in private browsing
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(toAppError(error));
      }
    );

    // ─── Response Interceptor ───────────────────────────────────────────────
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const startTime = response.config.metadata?.startTime;
        const latency = startTime ? Date.now() - startTime : 0;

        // If in development, log request tracing info
        if (process.env.NODE_ENV === 'development') {
          const requestId = response.config.metadata?.requestId;
          console.debug(
            `[API] ${response.config.method?.toUpperCase()} ${response.config.url} [${response.status}] - ${latency}ms (id: ${requestId})`
          );
        }

        // Automatic envelope unwrapping: if payload has { success, data }
        if (
          response.data &&
          typeof response.data === 'object' &&
          'success' in response.data
        ) {
          if (response.data.success === true && 'data' in response.data) {
            return response.data.data !== undefined ? response.data.data : null;
          }
          if (response.data.success === false) {
            const err = new ValidationError(
              response.data.message || 'Request was not successful',
              response.data.errors || [],
              response.config?.url
            );
            return Promise.reject(err);
          }
        }

        return response.data;
      },
      (error) => {
        const endpoint = error.config?.url;
        const appError = toAppError(error, endpoint);

        // Structured development diagnostic logging
        if (process.env.NODE_ENV === 'development') {
          if (appError.name === 'NetworkError' || appError.statusCode === 0) {
            console.warn(
              `[API Warning] ${error.config?.method?.toUpperCase()} ${endpoint} - Backend server is offline or unreachable at ${error.config?.baseURL || 'API'}. Ensure Backend is running on port 3000. Falling back to local offline data.`
            );
          } else {
            console.error(
              `[API Error] ${error.config?.method?.toUpperCase()} ${endpoint} - ${appError.name}: ${appError.message} (status: ${appError.statusCode})`
            );
          }
        }

        return Promise.reject(appError);
      }
    );
  }

  /**
   * Raw underlying Axios instance
   */
  public get rawInstance(): AxiosInstance {
    return this.instance;
  }

  // ─── Typed HTTP Methods ───────────────────────────────────────────────────

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config) as Promise<T>;
  }

  public async post<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config) as Promise<T>;
  }

  public async patch<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config) as Promise<T>;
  }

  public async put<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config) as Promise<T>;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config) as Promise<T>;
  }
}

/**
 * Enterprise AxiosClient alias for HttpClient
 */
export { HttpClient as AxiosClient };

/**
 * Singleton API Client for application-wide use
 */
export const apiClient = new HttpClient();
