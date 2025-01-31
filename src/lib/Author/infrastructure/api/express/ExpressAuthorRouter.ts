import { Router } from 'express';
import { ExpressAuthorController } from './ExpressAuthorController';
import {
	validateCreateAuthorDto,
	validateEditAuthorDto,
} from './middleware/Validation';
import { responseFormatter } from './middleware/ResponseFormatter';
import { verifyToken } from './middleware/Auth';
const controller = new ExpressAuthorController();
const authorRouter = Router();

authorRouter.get('/', responseFormatter, controller.getAll);
authorRouter.get('/:id', verifyToken, responseFormatter, controller.getById);
authorRouter.put(
	'/',
	verifyToken,
	validateEditAuthorDto,
	responseFormatter,
	controller.update,
);
authorRouter.delete('/:id', verifyToken, responseFormatter, controller.delete);
authorRouter.post(
	'/',
	validateCreateAuthorDto,
	responseFormatter,
	controller.save,
);
export { authorRouter };
