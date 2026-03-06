export const resumeSchemas = {
  Resume: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
};
