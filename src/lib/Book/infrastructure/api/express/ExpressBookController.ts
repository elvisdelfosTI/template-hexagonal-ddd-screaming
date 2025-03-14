import ServiceContainer from '@shared/infrastructure/serviceContainer';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ExpressBookController {
  async getAll(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await ServiceContainer.BookService.getAll.execute();
      res.json(books.map((b) => b.mapToPrimitive())).status(StatusCodes.OK);
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
      const bookId = Number.parseInt(req.params.id);
      const book = await ServiceContainer.BookService.getById.execute(bookId);
      res.json(book).status(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
  async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await ServiceContainer.BookService.save.execute(req.body);
      res.json(book).status(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await ServiceContainer.BookService.update.execute(req.body);
      res.json(book.mapToPrimitive()).status(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookId = Number.parseInt(req.params.id);
      if (!bookId || Number.isNaN(bookId)) {
        throw new Error('Invalid book ID');
      }
      const book = await ServiceContainer.BookService.delete.execute(bookId);
      res.json(book).status(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
