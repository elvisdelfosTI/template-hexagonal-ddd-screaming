import { ExpressAuthController } from '@auth/infrastructure/express/ExpressAuthController';
import { authorRouter } from '@author/infrastructure/api/express/ExpressAuthorRouter';
import { verifyToken } from '@author/infrastructure/api/express/middleware/Auth';
import { responseFormatter } from '@author/infrastructure/api/express/middleware/ResponseFormatter';
import { bookRouter } from '@book/infrastructure/api/express/ExpressBookRouter';
import express from 'express';

const authController = new ExpressAuthController();

const route = express.Router();

//author
route.use('/author', authorRouter);

//book
route.use('/book', verifyToken, bookRouter);

//auth
route.post('/auth/login', authController.login, responseFormatter);

export default route;
