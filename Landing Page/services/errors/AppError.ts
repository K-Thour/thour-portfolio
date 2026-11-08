/**
 * Base Application Error
 * All specialized error classes inherit from AppError to ensure predictable structure.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly endpoint?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    details?: unknown,
    endpoint?: string,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.endpoint = endpoint;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      endpoint: this.endpoint,
      timestamp: this.timestamp,
      details: this.details,
    };
  }
}

/**
 * Generic HTTP Error for non-2xx responses
 */
export class HttpError extends AppError {
  constructor(message: string, statusCode = 500, details?: unknown, endpoint?: string) {
    super(message, statusCode, details, endpoint);
  }
}

/**
 * Network Connectivity / Disconnect Failure (Status 0)
 */
export class NetworkError extends AppError {
  public readonly retryable = true;

  constructor(
    message = 'Network connectivity error. Please check your internet connection.',
    endpoint?: string
  ) {
    super(message, 0, null, endpoint, true);
  }
}

/**
 * Validation Error (Status 400 or 422) with itemized field issues
 */
export interface FieldError {
  field: string;
  message: string;
}

export class ValidationError extends AppError {
  public readonly fieldErrors: FieldError[];

  constructor(
    message = 'Validation failed for the submitted data.',
    fieldErrors: FieldError[] = [],
    endpoint?: string
  ) {
    super(message, 400, fieldErrors, endpoint, true);
    this.fieldErrors = fieldErrors;
  }
}

/**
 * Not Found Error (Status 404)
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource', endpoint?: string) {
    super(`${resource} could not be found.`, 404, null, endpoint, true);
  }
}

/**
 * Unauthorized Error (Status 401)
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required to access this resource.', endpoint?: string) {
    super(message, 401, null, endpoint, true);
  }
}

/**
 * Forbidden Error (Status 403)
 */
export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to access this resource.', endpoint?: string) {
    super(message, 403, null, endpoint, true);
  }
}

/**
 * Timeout Error (Status 408)
 */
export class TimeoutError extends AppError {
  public readonly retryable = true;

  constructor(message = 'The request timed out. Please try again.', endpoint?: string) {
    super(message, 408, null, endpoint, true);
  }
}

/**
 * Rate Limit Error (Status 429)
 */
export class RateLimitError extends AppError {
  public readonly retryAfterSeconds?: number;

  constructor(
    message = 'Too many requests. Please slow down and try again later.',
    retryAfterSeconds?: number,
    endpoint?: string
  ) {
    super(message, 429, { retryAfterSeconds }, endpoint, true);
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/**
 * Internal Server Error (Status 500+)
 */
export class ServerError extends AppError {
  constructor(
    message = 'An unexpected server error occurred. Our engineering team has been notified.',
    statusCode = 500,
    details?: unknown,
    endpoint?: string
  ) {
    super(message, statusCode, details, endpoint, false);
  }
}

