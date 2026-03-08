export const contactPaths = {
  '/contact/create': {
    post: {
      summary: 'Create a new Contact',
      tags: ['Contact'],
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
  '/contact/update/{id}': {
    patch: {
      summary: 'Update an existing Contact',
      tags: ['Contact'],
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
  '/contact/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Contact',
      tags: ['Contact'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/contact/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Contact',
      tags: ['Contact'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/contact/get': {
    get: {
      summary: 'Get a list of Contacts',
      tags: ['Contact'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Contact' } },
            },
          },
        },
      },
    },
  },
  '/contact/get/{id}': {
    get: {
      summary: 'Get a Contact by ID',
      tags: ['Contact'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contact' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
