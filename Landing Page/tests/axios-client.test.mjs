import test from 'node:test';
import assert from 'node:assert/strict';
import { AxiosError } from 'axios';
import {
  HttpClient,
  AxiosClient,
  apiClient,
  generateRequestId,
  get,
  post,
  patch,
  put,
  del,
  delete as deleteFn,
} from '../services/client/index.ts';
import {
  AppError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  NetworkError,
} from '../services/errors/index.ts';

test('generateRequestId: generates unique prefixed ID', () => {
  const id1 = generateRequestId();
  const id2 = generateRequestId();
  assert.ok(id1.startsWith('req_'), 'Request ID must start with req_');
  assert.ok(id2.startsWith('req_'), 'Request ID must start with req_');
  assert.notEqual(id1, id2, 'Successive request IDs must be unique');
});

test('HttpClient and AxiosClient: class initialization and configuration defaults', () => {
  assert.equal(HttpClient, AxiosClient, 'AxiosClient must be an alias/export of HttpClient');
  const custom = new HttpClient('http://custom-api.example.com', 5000);
  assert.equal(custom.baseURL, 'http://custom-api.example.com');
  assert.equal(custom.rawInstance.defaults.timeout, 5000);

  // Default client timeout must be 10000ms
  const defaultClient = new HttpClient();
  assert.equal(defaultClient.rawInstance.defaults.timeout, 10000);
  assert.ok(apiClient instanceof HttpClient, 'apiClient must be an instance of HttpClient');
});

test('Request Interceptor: attaches x-request-id, Content-Type, and metadata', async () => {
  const client = new HttpClient('http://test.local');
  let capturedConfig = null;

  client.rawInstance.defaults.adapter = async (config) => {
    capturedConfig = config;
    return {
      data: { success: true, data: { status: 'healthy' } },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };

  const result = await client.get('/health');
  assert.ok(capturedConfig, 'Adapter should be invoked with request config');
  const reqId = capturedConfig.headers.get('x-request-id') || capturedConfig.headers['x-request-id'];
  assert.ok(reqId, 'x-request-id header must be present');
  assert.ok(String(reqId).startsWith('req_'), 'x-request-id must start with req_');

  const contentType = capturedConfig.headers.get('Content-Type') || capturedConfig.headers['Content-Type'];
  assert.equal(contentType, 'application/json');

  assert.ok(capturedConfig.metadata?.startTime, 'Metadata startTime must be recorded');
  assert.equal(capturedConfig.metadata?.requestId, reqId);
  assert.deepEqual(result, { status: 'healthy' }, 'Envelope should be unwrapped to data');
});

test('Response Interceptor: unwraps standardized { success: true, data } envelopes', async () => {
  const testProjects = [
    { id: 1, title: 'Portfolio Project' },
    { id: 2, title: 'AI Assistant' },
  ];
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => ({
    data: { success: true, data: testProjects },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });

  const result = await client.get('/projects');
  assert.deepEqual(result, testProjects);
});

test('Response Interceptor: handles null data inside standardized envelope', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => ({
    data: { success: true, data: null },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });

  const result = await client.get('/empty');
  assert.equal(result, null);
});

test('Response Interceptor: passes through non-enveloped payloads transparently', async () => {
  const rawPayload = { custom_field: 'unwrapped', count: 42 };
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => ({
    data: rawPayload,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });

  const result = await client.get('/raw');
  assert.deepEqual(result, rawPayload);
});

test('Response Interceptor: converts { success: false } in 200 payload into ValidationError', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => ({
    data: {
      success: false,
      message: 'Operation failed validation',
      errors: [{ field: 'query', message: 'Query cannot be empty' }],
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });

  await assert.rejects(
    async () => {
      await client.get('/search');
    },
    (err) => {
      assert.ok(err instanceof ValidationError);
      assert.equal(err.statusCode, 400);
      assert.equal(err.fieldErrors.length, 1);
      assert.equal(err.fieldErrors[0].field, 'query');
      assert.match(err.message, /Operation failed validation/);
      return true;
    }
  );
});

test('Error Interceptor: converts HTTP 400 AxiosError into ValidationError with fieldErrors', async () => {
  const fieldErrors = [
    { field: 'email', message: 'Invalid email address' },
    { field: 'message', message: 'Message is required' },
  ];
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => {
    throw new AxiosError('Bad Request', 'ERR_BAD_REQUEST', config, null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config,
      data: {
        success: false,
        message: 'Validation failed for lead submission',
        errors: fieldErrors,
      },
    });
  };

  await assert.rejects(
    async () => {
      await client.post('/leads', { email: 'bad' });
    },
    (err) => {
      assert.ok(err instanceof AppError, 'Must be an AppError');
      assert.ok(err instanceof ValidationError, 'Must be a ValidationError');
      assert.equal(err.statusCode, 400);
      assert.deepEqual(err.fieldErrors, fieldErrors);
      assert.match(err.message, /Validation failed/);
      assert.equal(err.endpoint, '/leads');
      return true;
    }
  );
});

test('Error Interceptor: converts HTTP 404 AxiosError into NotFoundError', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => {
    throw new AxiosError('Not Found', 'ERR_BAD_REQUEST', config, null, {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config,
      data: { message: 'Project with id 999 could not be found' },
    });
  };

  await assert.rejects(
    async () => {
      await client.get('/projects/999');
    },
    (err) => {
      assert.ok(err instanceof NotFoundError);
      assert.equal(err.statusCode, 404);
      assert.equal(err.endpoint, '/projects/999');
      return true;
    }
  );
});

test('Error Interceptor: converts HTTP 500 AxiosError into ServerError', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => {
    throw new AxiosError('Internal Server Error', 'ERR_BAD_RESPONSE', config, null, {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config,
      data: { message: 'Database connection failed unexpectedly' },
    });
  };

  await assert.rejects(
    async () => {
      await client.get('/crash');
    },
    (err) => {
      assert.ok(err instanceof ServerError);
      assert.equal(err.statusCode, 500);
      assert.equal(err.endpoint, '/crash');
      return true;
    }
  );
});

test('Error Interceptor: converts ECONNABORTED AxiosError into TimeoutError', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => {
    const timeoutErr = new AxiosError('timeout of 10000ms exceeded', 'ECONNABORTED', config);
    throw timeoutErr;
  };

  await assert.rejects(
    async () => {
      await client.get('/slow-endpoint');
    },
    (err) => {
      assert.ok(err instanceof TimeoutError);
      assert.equal(err.statusCode, 408);
      assert.equal(err.retryable, true);
      assert.equal(err.endpoint, '/slow-endpoint');
      return true;
    }
  );
});

test('Error Interceptor: converts network failure (no response) into NetworkError', async () => {
  const client = new HttpClient('http://test.local');
  client.rawInstance.defaults.adapter = async (config) => {
    const netErr = new AxiosError('Network Error', 'ERR_NETWORK', config);
    throw netErr;
  };

  await assert.rejects(
    async () => {
      await client.get('/unreachable');
    },
    (err) => {
      assert.ok(err instanceof NetworkError);
      assert.equal(err.statusCode, 0);
      assert.equal(err.retryable, true);
      assert.equal(err.endpoint, '/unreachable');
      return true;
    }
  );
});

test('Typed HTTP verbs: support patch, put, and delete methods', async () => {
  const client = new HttpClient('http://test.local');
  const calledMethods = [];

  client.rawInstance.defaults.adapter = async (config) => {
    calledMethods.push(config.method?.toUpperCase());
    return {
      data: { success: true, data: { method: config.method?.toUpperCase() } },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };

  const patchRes = await client.patch('/item', { name: 'updated' });
  assert.equal(patchRes.method, 'PATCH');

  const putRes = await client.put('/item', { name: 'replaced' });
  assert.equal(putRes.method, 'PUT');

  const delRes = await client.delete('/item');
  assert.equal(delRes.method, 'DELETE');

  assert.deepEqual(calledMethods, ['PATCH', 'PUT', 'DELETE']);
});

test('index.ts: re-exports typed HTTP verb methods bound to apiClient', () => {
  assert.equal(typeof get, 'function', 'get must be exported as a function');
  assert.equal(typeof post, 'function', 'post must be exported as a function');
  assert.equal(typeof patch, 'function', 'patch must be exported as a function');
  assert.equal(typeof put, 'function', 'put must be exported as a function');
  assert.equal(typeof del, 'function', 'del must be exported as a function');
  assert.equal(typeof deleteFn, 'function', 'delete must be exported as a function');
  assert.equal(del, deleteFn, 'del and delete should reference the same helper');
});
