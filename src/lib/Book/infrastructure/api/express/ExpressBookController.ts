import { NextFunction, Request, Response } from 'express';
import ServiceContainer from 'src/lib/shared/infrastructure/serviceContainer';

export class ExpressBookController {
  async getAll(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await ServiceContainer.BookService.getAll.execute();
      res.json(books).status(200);
    } catch (error) {
      next(error);
    }
  }
  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookId = parseInt(req.params.id);
      const book = await ServiceContainer.BookService.getById.execute(bookId);
      res.json(book).status(200);
    } catch (error) {
      next(error);
    }
  }
  async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await ServiceContainer.BookService.save.execute(req.body);
      res.json(book).status(201);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await ServiceContainer.BookService.save.execute(req.body);
      res.json(book).status(201);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await ServiceContainer.BookService.delete.execute(
        +req.params.id,
      );
      res.json(book).status(200);
    } catch (error) {
      next(error);
    }
  }
}
