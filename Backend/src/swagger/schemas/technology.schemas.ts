export const technologySchemas = {
  Technology: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
};
