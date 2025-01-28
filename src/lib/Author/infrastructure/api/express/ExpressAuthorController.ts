import { NextFunction, Request, Response } from 'express';
import { AuthorDto } from '#author/application/UsesCases/UserSave/AuthorSaveDTO';
import ServiceContainer from '#shared/infrastructure/serviceContainer';

export class ExpressAuthorController {
  async getAll(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authors = await ServiceContainer.AuthorService.getAll.execute();
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
      const Author = await ServiceContainer.AuthorService.getById.execute(
        parseInt(req.params.id),
      );
      res.json(Author.mapToPrimitivesWithoutPassword()).status(200);
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
        await ServiceContainer.AuthorService.save.execute(authorData);
      res.json(Author).status(201);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await ServiceContainer.AuthorService.update.execute(req.body);

      res.json({ id: req.body.id }).status(200);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await ServiceContainer.AuthorService.delete.execute(+req.params.id);
      res.json({ id: req.params.id }).status(200);
    } catch (error) {
      next(error);
    }
  }
}
