import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
const controller = new ExpressAuthorController();
const authorRouter = Router();
authorRouter.get('/user/', controller.getAll);
authorRouter.post('/user/', controller.save);
export { authorRouter };
