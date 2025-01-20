import { Router } from 'express';
import { ExpressAuthorController } from './lib/Author/infrastructure/api/express/ExpressAuthorController';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
const controller = new ExpressAuthorController();
const route = Router();

//author
route.get('/author/', controller.getAll);
route.post('/author/', controller.save);

route.get('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { route  };
