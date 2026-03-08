import * as paths from './paths';
import * as schemas from './schemas';
import { securitySchemes } from './components.swagger';

// Combine all exported paths objects into a single object
const unifiedPaths = Object.values(paths).reduce((acc, curr) => ({ ...acc, ...curr }), {});
const unifiedSchemas = Object.values(schemas).reduce((acc, curr) => ({ ...acc, ...curr }), {});

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Portfolio Server API',
    version: '1.0.0',
    description: 'API documentation for Portfolio Server',
  },
  servers: [
    { url: `http://localhost:${process.env.PORT || 3000}` },
    { url: 'https://portfolio-backend.thour.com' },
  ],
  paths: unifiedPaths,
  components: {
    securitySchemes,
    schemas: unifiedSchemas,
  },
  security: [{ BearerAuth: [] }],
};
