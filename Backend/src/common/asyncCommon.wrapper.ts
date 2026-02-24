import { Request, Response } from 'express';
import CREATION_CONSTANT from '../constants/creation.constant';
import { STATUS_CODE } from '../constants/statusCode.constant';
import { ICommonResponse } from '../interface/common/common.interface';
import commonResponse from './commonResponses';
import MESSAGES_COMMON from '../constants/messages.constant';

export const asyncCommonWrapper = async <T>(
  callback: () => Promise<ICommonResponse<T>>,
): Promise<ICommonResponse<T>> => {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof Error) {
      return commonResponse.error(
        [],
        error.message,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        CREATION_CONSTANT.NO_CREATION,
      );
    }

    return commonResponse.error(
      [],
      MESSAGES_COMMON.error.internalServerError,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      CREATION_CONSTANT.NO_CREATION,
    );
  }
};

export const globalErrorHandler = (error: unknown, _req: Request, res: Response) => {
  if (error instanceof Error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: MESSAGES_COMMON.error.internalServerError,
  });
};
