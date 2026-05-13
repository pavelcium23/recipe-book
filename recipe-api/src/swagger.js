import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Book API',
      version: '1.0.0',
      description: 'REST API for managing recipes. All endpoints require a JWT obtained from POST /token.',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Local development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Get a token from POST /token then paste it here.',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)
