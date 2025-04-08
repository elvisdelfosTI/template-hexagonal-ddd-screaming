import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
import { verifyToken } from './middleware/JWTHandler';
import {
  validateCreateAuthorDto,
  validateEditAuthorDto,
} from './middleware/Validation';
const controller = new ExpressAuthorController();
const authorRouter = Router();

authorRouter.get('/', controller.getAll);
authorRouter.get('/:id', verifyToken, controller.getById);
authorRouter.put('/', verifyToken, validateEditAuthorDto, controller.update);
authorRouter.delete('/:id', verifyToken, controller.delete);
authorRouter.post(
  '/',
  validateCreateAuthorDto,

  controller.save,
);
export { authorRouter };
