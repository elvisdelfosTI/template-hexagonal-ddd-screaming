import express from 'express';
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

export default route;
