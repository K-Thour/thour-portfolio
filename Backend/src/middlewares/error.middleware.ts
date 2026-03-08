import { Request, Response } from 'express';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON from '../constants/messages.constant';
import { STATUS_CODE } from '../constants/statusCode.constant';

interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode || err.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message = err.message || MESSAGES_COMMON.error.internalServerError;

  const error = commonResponse.error(err, message, statusCode, 0);

  console.error('Error:', error);

  res.status(error.statusCode).json(error);
};

export default errorHandler;
