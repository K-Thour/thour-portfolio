export const experiencePaths = {
  '/experience/create': {
    post: {
      summary: 'Create a new Experience',
      tags: ['Experience'],
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
  '/experience/update/{id}': {
    patch: {
      summary: 'Update an existing Experience',
      tags: ['Experience'],
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
  '/experience/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Experience',
      tags: ['Experience'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/experience/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Experience',
      tags: ['Experience'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/experience/get': {
    get: {
      summary: 'Get a list of Experiences',
      tags: ['Experience'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Experience' } },
            },
          },
        },
      },
    },
  },
  '/experience/get/{id}': {
    get: {
      summary: 'Get a Experience by ID',
      tags: ['Experience'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Experience' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
