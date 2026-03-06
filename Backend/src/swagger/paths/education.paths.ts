export const educationPaths = {
  '/education/create': {
    post: {
      summary: 'Create a new Education',
      tags: ['Education'],
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
  '/education/update/{id}': {
    patch: {
      summary: 'Update an existing Education',
      tags: ['Education'],
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
  '/education/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Education',
      tags: ['Education'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/education/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Education',
      tags: ['Education'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/education/get': {
    get: {
      summary: 'Get a list of Educations',
      tags: ['Education'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Education' } },
            },
          },
        },
      },
    },
  },
  '/education/get/{id}': {
    get: {
      summary: 'Get a Education by ID',
      tags: ['Education'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Education' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
