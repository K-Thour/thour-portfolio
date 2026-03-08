export const servicePaths = {
  '/service/create': {
    post: {
      summary: 'Create a new Service',
      tags: ['Service'],
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
  '/service/update/{id}': {
    patch: {
      summary: 'Update an existing Service',
      tags: ['Service'],
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
  '/service/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Service',
      tags: ['Service'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/service/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Service',
      tags: ['Service'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/service/get': {
    get: {
      summary: 'Get a list of Services',
      tags: ['Service'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
            },
          },
        },
      },
    },
  },
  '/service/get/{id}': {
    get: {
      summary: 'Get a Service by ID',
      tags: ['Service'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Service' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
