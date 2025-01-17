import { NextFunction, Request, Response } from 'express';
import { AuthorDto } from 'src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
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
      const authorData: AuthorDto = {
        id: request.body.id,
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        age: request.body.age,
      };
      const Author =
        await ServiceContainer.AuthorService.save.handler(authorData);

      res.json(Author).status(201);
    } catch (error) {
      next(error);
    }
  }
}
