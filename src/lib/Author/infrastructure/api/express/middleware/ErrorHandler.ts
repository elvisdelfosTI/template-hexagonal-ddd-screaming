import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof Error) {
    if (err.message.includes('Unique constraint failed')) {
      return res
        .status(409)
        .json({ status: 409, data: null, errors: { message: err.message } });
    }
    return res
      .status(500)
      .json({ status: 500, data: null, errors: { message: err.message } });
  }

  res
    .status(500)
    .json({ status: 500, data: null, errors: { message: 'Something broke!' } });
};
