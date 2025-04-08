import serviceContainer from '@shared/infrastructure/serviceContainer';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body.email;
      const password = req.body.password;
      const auth = await serviceContainer.AuthenticationService.login.execute(
        user,
        password,
      );
      res.json(auth).status(StatusCodes.ACCEPTED);
    } catch (error) {
      next(error);
    }
  }
}
