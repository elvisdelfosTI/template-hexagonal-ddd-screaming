import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

import { ExpressAuthController } from './lib/Auth/infrastructure/express/ExpressAuthController';
import { authorRouter } from './lib/Author/infrastructure/api/express/ExpressAuthorRouter';
import { bookRouter } from './lib/Book/infrastructure/api/express/ExpressBookRouter';

const authController = new ExpressAuthController();

const route = express.Router();
//author
route.use('/author', authorRouter);

//book
route.use('/book', bookRouter);

//auth
route.post('/auth/login', authController.login);

if (process.env.ENV !== 'production') {
  route.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default route;
