import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Url-Shortener REST API',
      version: '1.0.0',
      description: 'A simple REST API for managing user urls that is both short and long urls',
      contact: {
        name: 'API Support',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Bearer token **_only_**',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'User ID' },
            firstName: { type: 'string', description: 'User\'s first name' },
            lastName: { type: 'string', description: 'User\'s last name' },
            email: { type: 'string', format: 'email', description: 'User\'s email address' },
          },
          required: ['id', 'firstName', 'lastName', 'email'],
        },
        url: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'Url ID' },
            user_id: { type: 'string', format: 'uuid', description: 'Provider ID' },
            long_url: { type: 'string' },
            short_code: { type: 'string' },
            created_at: { type: 'string' },
            expires_at: { type: 'string' },
            clicks: {type: 'number'}
          },
          required: ['id', 'user_id', 'long_url', 'short_code', 'created_at', 'expires_at', 'clicks'],
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/url.js', './routes/auth.js', './routes/redirect.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
