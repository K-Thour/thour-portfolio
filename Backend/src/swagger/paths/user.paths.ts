export const userPaths = {
  '/user/register': {
    post: {
      summary: 'Register a new User',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserRegisterInput' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
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
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserLoginInput' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Logged in successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: {
                    type: 'object',
                    properties: {
                      user: { $ref: '#/components/schemas/User' },
                      token: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
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
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
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
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserUpdateInput' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
        '401': { description: 'Unauthorized' },
      },
    },
  },
};
