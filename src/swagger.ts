import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    version: '3.0.0',
    info: {
      title: 'Arquetipo Express API with Swagger',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
  },
  apis: ['./docs/swagger.yml'],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
