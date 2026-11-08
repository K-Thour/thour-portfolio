export * from './AppError.ts';
import {
  AppError,
  HttpError,
  NetworkError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  TimeoutError,
  RateLimitError,
  ServerError,
  type FieldError,
} from './AppError.ts';

/**
 * Type guard to check if an unknown error is an instance of AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard to check if an unknown error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Convert an unknown error or raw Axios error into a typed AppError subclass
 */
export function toAppError(error: unknown, endpoint?: string): AppError {
  if (isAppError(error)) {
    return error;
  }

  // Axios-like error duck-typing
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: {
          message?: string;
          errors?: FieldError[];
          error?: string;
        };
      };
      code?: string;
      message?: string;
    };

    const status = axiosError.response?.status;
    const responseData = axiosError.response?.data;
    const serverMessage = responseData?.message || responseData?.error || axiosError.message;

    if (axiosError.code === 'ECONNABORTED' || axiosError.message?.includes('timeout')) {
      return new TimeoutError(undefined, endpoint);
    }

    if (!axiosError.response) {
      return new NetworkError(axiosError.message || undefined, endpoint);
    }

    switch (status) {
      case 400:
      case 422:
        return new ValidationError(serverMessage, responseData?.errors || [], endpoint);
      case 401:
        return new UnauthorizedError(serverMessage, endpoint);
      case 403:
        return new ForbiddenError(serverMessage, endpoint);
      case 404:
        return new NotFoundError(serverMessage, endpoint);
      case 429:
        return new RateLimitError(serverMessage, undefined, endpoint);
      default:
        if (status && status >= 500) {
          return new ServerError(serverMessage, status, responseData, endpoint);
        }
        return new HttpError(serverMessage || 'HTTP Error', status || 500, responseData, endpoint);
    }
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, undefined, endpoint, false);
  }

  return new AppError('An unexpected error occurred.', 500, error, endpoint, false);
}
