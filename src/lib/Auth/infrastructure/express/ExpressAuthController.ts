import { NextFunction, Request, Response } from 'express';
import ServiceContainer from '../../../shared/infrastructure/serviceContainer';

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body.email;
      const password = req.body.password;
      const auth = await ServiceContainer.AuthenticationService.login.execute(
        user,
        password,
      );
      res.json(auth).status(200);
    } catch (error) {
      next(error);
    }
  }
}
