export const portfolioPaths = {
  '/portfolio/create': {
    post: {
      summary: 'Create a new Portfolio',
      tags: ['Portfolio'],
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
  '/portfolio/update/{id}': {
    patch: {
      summary: 'Update an existing Portfolio',
      tags: ['Portfolio'],
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
  '/portfolio/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Portfolio',
      tags: ['Portfolio'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/portfolio/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Portfolio',
      tags: ['Portfolio'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/portfolio/get': {
    get: {
      summary: 'Get a list of Portfolios',
      tags: ['Portfolio'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Portfolio' } },
            },
          },
        },
      },
    },
  },
  '/portfolio/get/{id}': {
    get: {
      summary: 'Get a Portfolio by ID',
      tags: ['Portfolio'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Portfolio' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
