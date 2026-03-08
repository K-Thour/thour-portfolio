import { ZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import commonResponse from '../common/commonResponses';
import { STATUS_CODE } from '../constants/statusCode.constant';
import { ValidationTarget } from '../interface/common/validation.types';

function validate(schema: ZodObject, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req[target] = schema.parse(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorResponse = commonResponse.error(
          error.issues,
          'Validation failed',
          STATUS_CODE.BAD_REQUEST,
          0,
        );
        return res.status(errorResponse.statusCode).json(errorResponse);
      }
      const errorResponse = commonResponse.error(
        error,
        'Validation failed',
        STATUS_CODE.BAD_REQUEST,
        0,
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }
  };
}

export default validate;
