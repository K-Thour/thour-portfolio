export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string', default: 'Single_User' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phoneNumber: { type: 'string' },
      experience: { type: 'number' },
      completedProjects: { type: 'number' },
      solvedProblems: { type: 'number' },
      happyClients: { type: 'number' },
      InstagramURL: { type: 'string', format: 'uri' },
      LinkedInURL: { type: 'string', format: 'uri' },
      GitHubURL: { type: 'string', format: 'uri' },
      hobbies: { type: 'array', items: { type: 'string' } },
      languages: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'native'] },
          },
          required: ['name', 'level'],
        },
      },
      image: {
        type: 'object',
        properties: {
          publicId: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          alt: { type: 'string' },
        },
        required: ['publicId', 'url'],
      },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
    required: [
      'name',
      'email',
      'phoneNumber',
      'experience',
      'completedProjects',
      'solvedProblems',
      'happyClients',
    ],
  },
  UserRegisterInput: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 30 },
      email: { type: 'string', format: 'email' },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 30,
        description:
          'Must contain at least one uppercase letter, one number, and one special character.',
      },
      phoneNumber: { type: 'string', pattern: '^\\+?[0-9]{7,15}$' },
      experience: { type: 'number', minimum: 0 },
      completedProjects: { type: 'number', minimum: 0 },
      solvedProblems: { type: 'number', minimum: 0 },
      happyClients: { type: 'number', minimum: 0 },
      InstagramURL: { type: 'string', format: 'uri' },
      LinkedInURL: { type: 'string', format: 'uri' },
      GitHubURL: { type: 'string', format: 'uri' },
      hobbies: { type: 'array', items: { type: 'string' } },
      languages: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'native'] },
          },
          required: ['name', 'level'],
        },
      },
      image: {
        type: 'object',
        properties: {
          publicId: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          alt: { type: 'string' },
        },
        required: ['publicId', 'url'],
      },
    },
    required: [
      'name',
      'email',
      'password',
      'phoneNumber',
      'experience',
      'completedProjects',
      'solvedProblems',
      'happyClients',
    ],
  },
  UserLoginInput: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', description: 'Password of the user' },
    },
    required: ['email', 'password'],
  },
  UserUpdateInput: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 30 },
      phoneNumber: { type: 'string', pattern: '^\\+?[0-9]{7,15}$' },
      experience: { type: 'number', minimum: 0 },
      completedProjects: { type: 'number', minimum: 0 },
      solvedProblems: { type: 'number', minimum: 0 },
      happyClients: { type: 'number', minimum: 0 },
      InstagramURL: { type: 'string', format: 'uri' },
      LinkedInURL: { type: 'string', format: 'uri' },
      GitHubURL: { type: 'string', format: 'uri' },
      hobbies: { type: 'array', items: { type: 'string' } },
      languages: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'native'] },
          },
          required: ['name', 'level'],
        },
      },
      image: {
        type: 'object',
        properties: {
          publicId: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          alt: { type: 'string' },
        },
        required: ['publicId', 'url'],
      },
    },
  },
};
