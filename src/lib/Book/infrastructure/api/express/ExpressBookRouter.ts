import { Router } from 'express';
import { ExpressBookController } from './ExpressBookController';
import { responseFormatter } from '#author/infrastructure/api/express/middleware/ResponseFormatter';

const controller = new ExpressBookController();
const bookRouter = Router();

bookRouter.get('/', responseFormatter, controller.getAll);
bookRouter.put('/', responseFormatter, controller.update);
bookRouter.delete('/:id', responseFormatter, controller.delete);
bookRouter.post('/', responseFormatter, controller.save);

export { bookRouter };
