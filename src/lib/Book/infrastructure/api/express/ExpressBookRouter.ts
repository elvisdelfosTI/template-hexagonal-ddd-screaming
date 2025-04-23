import { Router } from 'express';
import { ExpressBookController } from './ExpressBookController';

const controller = new ExpressBookController();
const bookRouter = Router();

bookRouter.get('/', controller.getAll);
bookRouter.put('/', controller.update);
bookRouter.delete('/:id', controller.delete);
bookRouter.post('/', controller.save);

export { bookRouter };
