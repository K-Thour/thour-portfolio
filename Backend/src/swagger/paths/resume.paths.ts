export const resumePaths = {
  '/resume/create': {
    post: {
      summary: 'Create a new Resume',
      tags: ['Resume'],
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
  '/resume/update/{id}': {
    patch: {
      summary: 'Update an existing Resume',
      tags: ['Resume'],
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
  '/resume/soft-delete/{id}': {
    delete: {
      summary: 'Soft delete a Resume',
      tags: ['Resume'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/resume/delete/{id}': {
    delete: {
      summary: 'Permanently delete a Resume',
      tags: ['Resume'],
      security: [{ BearerAuth: [] }],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Deleted successfully' },
        '401': { description: 'Unauthorized' },
      },
    },
  },
  '/resume/get': {
    get: {
      summary: 'Get a list of Resumes',
      tags: ['Resume'],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Resume' } },
            },
          },
        },
      },
    },
  },
  '/resume/get/{id}': {
    get: {
      summary: 'Get a Resume by ID',
      tags: ['Resume'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': {
          description: 'Fetched successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Resume' },
            },
          },
        },
        '404': { description: 'Not found' },
      },
    },
  },
};
