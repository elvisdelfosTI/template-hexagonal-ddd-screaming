import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
const controller = new ExpressAuthorController();
const authorRouter = Router();

authorRouter.get('/author/', controller.getAll);
authorRouter.post('/author/', controller.save);

export { authorRouter };
