export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      experience: { type: 'number' },
      completedProjects: { type: 'number' },
      solvedProblems: { type: 'number' },
      happyClients: { type: 'number' },
      hobbies: { type: 'array', items: { type: 'string' } },
    },
  },
};
