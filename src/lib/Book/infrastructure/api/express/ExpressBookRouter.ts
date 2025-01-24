import { Router } from 'express';
import { AuthMiddleware } from '@author/infrastructure/api/express/middleware/Auth';
import { ExpressBookController } from './ExpressBookController';
const controller = new ExpressBookController();
const bookRouter = Router();

bookRouter.get('/book/', controller.getAll);
bookRouter.put('/book/', controller.update);
bookRouter.post('/book/:id', controller.save);
bookRouter.delete('book/:id', AuthMiddleware.verifyToken, controller.delete);

export { bookRouter };
