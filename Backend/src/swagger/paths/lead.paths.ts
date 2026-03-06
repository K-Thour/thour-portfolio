export const leadPaths = {
  '/lead/create': {
    post: {
      summary: 'Create a new Lead',
      tags: ['Lead'],
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
  '/lead/update/{id}': {
    patch: {
      summary: 'Update an existing Lead',
      tags: ['Lead'],
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
  '/lead/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Lead',
      tags: ['Lead'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/lead/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Lead',
      tags: ['Lead'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/lead/get': {
    get: {
      summary: 'Get a list of Leads',
      tags: ['Lead'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Lead' } },
            },
          },
        },
      },
    },
  },
  '/lead/get/{id}': {
    get: {
      summary: 'Get a Lead by ID',
      tags: ['Lead'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Lead' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
