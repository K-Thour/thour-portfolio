const ENTITIES = {
  SINGULAR: {
    user: 'User',
  },
  PLURAL: {
    user: 'Users',
  },
} as const;

const apiPrefix = '/api';

export { ENTITIES, apiPrefix };
