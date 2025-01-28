import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
import { AuthMiddleware } from './middleware/Auth';
import {
  validateCreateAuthorDto,
  validateEditAuthorDto,
} from './middleware/Validation';
import { responseFormatter } from './middleware/ResponseFormatter';
const controller = new ExpressAuthorController();
const authorRouter = Router();

authorRouter.get('/', responseFormatter, controller.getAll);
authorRouter.get(
  '/:id',
  AuthMiddleware.verifyToken,
  responseFormatter,
  controller.getById,
);
authorRouter.put(
  '/',
  AuthMiddleware.verifyToken,
  validateEditAuthorDto,
  responseFormatter,
  controller.update,
);
authorRouter.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  responseFormatter,
  controller.delete,
);
authorRouter.post(
  '/',
  validateCreateAuthorDto,
  responseFormatter,
  controller.save,
);
export { authorRouter };
