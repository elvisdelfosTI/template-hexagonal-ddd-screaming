import { ExpressAuthController } from '@auth/infrastructure/express/ExpressAuthController';
import { authorRouter } from '@author/infrastructure/api/express/ExpressAuthorRouter';
import { verifyToken } from '@author/infrastructure/api/express/middleware/JWTHandler';
import { bookRouter } from '@book/infrastructure/api/express/ExpressBookRouter';
import express from 'express';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const authController = new ExpressAuthController();

const route = express.Router();

//author
route.use('/author', authorRouter);

//book
route.use('/book', verifyToken, bookRouter);

//auth
route.post('/auth/login', authController.login);

//ping
route.get('/ping', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'pong' });
});

export default route;
