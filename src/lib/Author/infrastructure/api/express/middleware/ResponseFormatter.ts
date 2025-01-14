import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const oldJson = res.json;

  res.json = function (data: unknown) {
    const response = {
      status: res.statusCode,
      data: res.statusCode >= 400 ? null : data,
      errors: res.statusCode >= 400 ? data : null,
    };
    oldJson.call(this, response);
    return this;
  };

  next();
};
