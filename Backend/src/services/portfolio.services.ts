import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IPortfolioModel, {
  createPortfolioInput,
} from '../interface/models/portfolio/portfolio.interface';
import { Types } from 'mongoose';
import { IPortfolioRepoParams } from '../interface/models/portfolio/portfolioRepo.interface';

const createService = (data: createPortfolioInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Portfolio'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<IPortfolioModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Portfolio'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Portfolio'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Portfolio'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: IPortfolioRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Portfolio'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: IPortfolioRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.portfolio.repo.getOne(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Portfolio'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const portfolioServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
};

export default portfolioServices;
