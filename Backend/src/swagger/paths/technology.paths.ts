export const technologyPaths = {
  '/technology/create': {
    post: {
      summary: 'Create a new Technology',
      tags: ['Technology'],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {
        '201': { description: 'Created successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/technology/update/{id}': {
    patch: {
      summary: 'Update an existing Technology',
      tags: ['Technology'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {
        '200': { description: 'Updated successfully' },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Not found' },
      },
    },
  },
  '/technology/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Technology',
      tags: ['Technology'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/technology/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Technology',
      tags: ['Technology'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/technology/get': {
    get: {
      summary: 'Get a list of Technologys',
      tags: ['Technology'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Technology' } },
            },
          },
        },
      },
    },
  },
  '/technology/get/{id}': {
    get: {
      summary: 'Get a Technology by ID',
      tags: ['Technology'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Technology' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
