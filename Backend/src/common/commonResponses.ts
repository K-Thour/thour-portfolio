import { ICommonResponse } from '../interface/common/common.interface';

const success = <T>(
  data: T | T[] | null,
  message: string,
  statusCode: number,
  total: number,
): ICommonResponse<T> => {
  return {
    data,
    total,
    message,
    statusCode,
    success: true,
  };
};

const error = <T>(
  data: T | T[] | null,
  message: string,
  statusCode: number,
  total: number,
): ICommonResponse<T> => {
  return {
    data,
    total,
    message,
    statusCode,
    success: false,
  };
};

const commonResponse = {
  success,
  error,
};

export default commonResponse;
