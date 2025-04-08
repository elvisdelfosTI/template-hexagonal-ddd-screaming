import { log } from '@config/Logger.config';
import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  _next,
) => {
  if (err instanceof Error) {
    log.error('err', err);
    if (err.message.includes('Unique constraint failed')) {
      res.status(StatusCodes.CONFLICT).json({
        status: StatusCodes.NOT_FOUND,
        data: null,
        errors: { message: err.message },
      });
      return;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      errors: { message: err.message },
    });
    return;
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    data: null,
    errors: { message: 'Something broke!' },
  });
  return;
};
