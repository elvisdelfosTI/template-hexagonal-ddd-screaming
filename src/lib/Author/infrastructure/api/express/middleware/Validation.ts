import type { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateCreateAuthorDto = [
  check('name').isString().withMessage('Name must be a string'),
  check('age')
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be between 18 and 100'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        data: null,
        errors: errors.array(),
      });
      return;
    }

    const allowedKeys = ['name', 'age', 'email', 'password'];
    const extraKeys = Object.keys(req.body).filter(
      (key) => !allowedKeys.includes(key),
    );
    if (extraKeys.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        data: null,
        errors: `Extra keys are not allowed: ${extraKeys.join(', ')}`,
      });
      return;
    }

    next();
  },
] as Array<(req: Request, res: Response, next: NextFunction) => void>;

export const validateEditAuthorDto = [
  check('id').isInt().withMessage('Id must be a number'),
  check('name').isString().withMessage('Name must be a string'),
  check('age')
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be between 18 and 100'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        data: null,
        errors: errors.array(),
      });
      return;
    }

    const allowedKeys = ['name', 'age', 'email', 'id', 'password'];
    const extraKeys = Object.keys(req.body).filter(
      (key) => !allowedKeys.includes(key),
    );
    if (extraKeys.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        data: null,
        errors: `Extra keys are not allowed: ${extraKeys.join(', ')}`,
      });
      return;
    }

    next();
  },
] as Array<(req: Request, res: Response, next: NextFunction) => void>;
