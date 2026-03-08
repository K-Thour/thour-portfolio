export const educationSchemas = {
  Education: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
};
