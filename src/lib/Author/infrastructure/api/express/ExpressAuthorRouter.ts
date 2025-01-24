import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
import { AuthMiddleware } from './middleware/Auth';
const controller = new ExpressAuthorController();
const authorRouter = Router();

authorRouter.get('/', controller.getAll);
authorRouter.get('/:id', AuthMiddleware.verifyToken, controller.getById);
authorRouter.put('/', AuthMiddleware.verifyToken, controller.update);
authorRouter.delete('/:id', AuthMiddleware.verifyToken, controller.delete);
authorRouter.post('/', controller.save);
export { authorRouter };
