import { NextFunction, Request, Response } from 'express';
import { AuthorNotFoundError } from 'src/lib/Author/domain/AuthorNotFoundError';
import ServiceContainer from 'src/lib/shared/infrastructure/serviceContainer';

export class ExpressAuthorController {
  async getAll(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authors = await ServiceContainer.AuthorService.getAll.handler();

      res.json(authors.map((a) => a.mapToPrimitives())).status(200);
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
      const Author = await ServiceContainer.AuthorService.getById.handler(
        parseInt(req.params.id),
      );
      res.json(Author).status(200);
    } catch (error) {
      next(error);
    }
  }
  async save(
    request: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const Author = await ServiceContainer.AuthorService.save.handler(
        request.body.id,
        request.body.name,
        request.body.email,
        request.body.password,
      );
      res.json(Author).status(201);
    } catch (error) {
      next(error);
    }
  }
}
