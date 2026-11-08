import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  AppError,
  HttpError,
  NetworkError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  RateLimitError,
  isAppError,
  isValidationError,
  toAppError,
} from '../services/errors/index.ts';

test('AppError Hierarchy: subclasses maintain prototype chain and status codes', () => {
  const generic = new AppError('Something went wrong', 500);
  assert.ok(generic instanceof Error);
  assert.ok(generic instanceof AppError);
  assert.equal(generic.statusCode, 500);
  assert.equal(generic.name, 'AppError');

  const notFound = new NotFoundError('Project');
  assert.ok(notFound instanceof AppError);
  assert.ok(notFound instanceof NotFoundError);
  assert.equal(notFound.statusCode, 404);
  assert.match(notFound.message, /Project could not be found/);

  const validation = new ValidationError('Invalid email format', [{ field: 'email', message: 'Must be valid email' }]);
  assert.ok(validation instanceof ValidationError);
  assert.equal(validation.statusCode, 400);
  assert.equal(validation.fieldErrors.length, 1);
  assert.equal(validation.fieldErrors[0].field, 'email');

  const network = new NetworkError();
  assert.ok(network instanceof NetworkError);
  assert.equal(network.statusCode, 0);
  assert.equal(network.retryable, true);

  const timeout = new TimeoutError();
  assert.ok(timeout instanceof TimeoutError);
  assert.equal(timeout.statusCode, 408);
  assert.equal(timeout.retryable, true);

  const rateLimit = new RateLimitError('Too many queries', 60);
  assert.ok(rateLimit instanceof RateLimitError);
  assert.equal(rateLimit.statusCode, 429);
  assert.equal(rateLimit.retryAfterSeconds, 60);

  const server = new ServerError();
  assert.ok(server instanceof ServerError);
  assert.equal(server.statusCode, 500);
});

test('AppError serialization: toJSON() outputs structured diagnostic details', () => {
  const err = new HttpError('Forbidden', 403, { reason: 'insufficient_scopes' }, '/api/v1/user');
  const json = err.toJSON();
  assert.equal(json.name, 'HttpError');
  assert.equal(json.statusCode, 403);
  assert.equal(json.endpoint, '/api/v1/user');
  assert.ok(json.timestamp);
});

test('toAppError conversion: converts Axios-like error objects into typed classes', () => {
  // Mock Axios 400 Validation Error
  const axiosValError = {
    isAxiosError: true,
    response: {
      status: 400,
      data: {
        message: 'Validation failed',
        errors: [{ field: 'name', message: 'Name is required' }],
      },
    },
  };
  const convertedVal = toAppError(axiosValError, '/lead/create');
  assert.ok(isValidationError(convertedVal));
  assert.equal(convertedVal.statusCode, 400);
  assert.equal(convertedVal.endpoint, '/lead/create');

  // Mock Axios 404 Error
  const axios404 = {
    isAxiosError: true,
    response: { status: 404, data: { message: 'Project not found' } },
  };
  const converted404 = toAppError(axios404);
  assert.ok(converted404 instanceof NotFoundError);
  assert.equal(converted404.statusCode, 404);

  // Mock Axios Timeout Error
  const axiosTimeout = {
    isAxiosError: true,
    code: 'ECONNABORTED',
    message: 'timeout of 10000ms exceeded',
  };
  const convertedTimeout = toAppError(axiosTimeout);
  assert.ok(convertedTimeout instanceof TimeoutError);

  // Mock Network Failure
  const axiosNetwork = {
    isAxiosError: true,
    message: 'Network Error',
  };
  const convertedNet = toAppError(axiosNetwork);
  assert.ok(convertedNet instanceof NetworkError);
});

test('API Types file: types/api.ts exists and declares all required DTO interfaces', () => {
  const apiTypesPath = path.resolve('types/api.ts');
  assert.ok(fs.existsSync(apiTypesPath), 'types/api.ts must exist');
  const content = fs.readFileSync(apiTypesPath, 'utf-8');

  const requiredInterfaces = [
    'ApiResponse',
    'PublicUser',
    'Project',
    'Service',
    'Technology',
    'Experience',
    'Education',
    'ContactPayload',
    'LeadPayload',
    'Resume',
    'ChatMessage',
    'ChatResponse',
  ];

  for (const iface of requiredInterfaces) {
    assert.match(content, new RegExp(`export interface ${iface}`), `types/api.ts must declare ${iface}`);
  }
});

