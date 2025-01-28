import swaggerUi from 'swagger-ui-express';
import express from 'express';
const app = express();
import yaml from 'yaml';
import fs from 'fs';
const file = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);
export default swaggerDocument;

const route = express.Router();

if (process.env.ENV !== 'production') {
  route.use(
    '/documentation',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
}

function startDocServer() {
  const PORT = process.env.PORT_REST || 3000;
  const baseUrl = `http://localhost`;
  app.listen(PORT, () => {
    if (process.env.ENV !== 'production') {
      console.log(
        `📜 Documentation is running at ${baseUrl}:${PORT}/api/v1/documentation`,
      );
    }
  });
}
startDocServer();
