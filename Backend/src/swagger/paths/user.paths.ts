export const userPaths = {
  '/user/register': {
    post: {
      summary: 'Register a new User',
      tags: ['User'],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {
        '201': { description: 'Registered successfully' },
        '400': { description: 'Validation error or user exists' },
      },
    },
  },
  '/user/login': {
    post: {
      summary: 'Login an existing User',
      tags: ['User'],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {
        '200': { description: 'Logged in successfully' },
        '404': { description: 'User not found or invalid credentials' },
      },
    },
  },
  '/user/me': {
    get: {
      summary: 'Get current authenticated User',
      tags: ['User'],
      security: [{ BearerAuth: [] }],
      responses: {
        '200': { description: 'Fetched successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/user/update': {
    patch: {
      summary: 'Update current authenticated User',
      tags: ['User'],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {
        '200': { description: 'Updated successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
};
