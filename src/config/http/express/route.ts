import express from 'express';
import { verifyToken } from '#author/infrastructure/api/express/middleware/Auth';
import { responseFormatter } from '#author/infrastructure/api/express/middleware/ResponseFormatter';
import { ExpressAuthController } from '#auth/infrastructure/express/ExpressAuthController';
import { authorRouter } from '#author/infrastructure/api/express/ExpressAuthorRouter';
import { bookRouter } from '#book/infrastructure/api/express/ExpressBookRouter';

const authController = new ExpressAuthController();

const route = express.Router();

//author
route.use('/author', authorRouter);

//book
route.use('/book', verifyToken, bookRouter);

//auth
route.post('/auth/login', responseFormatter, authController.login);

export default route;
