export const projectPaths = {
  '/project/create': {
    post: {
      summary: 'Create a new Project',
      tags: ['Project'],
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
  '/project/update/{id}': {
    patch: {
      summary: 'Update an existing Project',
      tags: ['Project'],
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
  '/project/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Project',
      tags: ['Project'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/project/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Project',
      tags: ['Project'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/project/get': {
    get: {
      summary: 'Get a list of Projects',
      tags: ['Project'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
            },
          },
        },
      },
    },
  },
  '/project/get/{id}': {
    get: {
      summary: 'Get a Project by ID',
      tags: ['Project'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Project' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
