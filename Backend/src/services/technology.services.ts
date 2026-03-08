import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import ITechnologyModel, {
  createTechnologyInput,
} from '../interface/models/technology/technology.interface';
import { Types } from 'mongoose';
import { ITechnologyRepoParams } from '../interface/models/technology/technologyRepo.interface';

const createService = (data: createTechnologyInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Technology'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<ITechnologyModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Technology'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Technology'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Technology'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: ITechnologyRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Technology'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: ITechnologyRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.technology.repo.getOne(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Technology'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const technologyServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
};

export default technologyServices;
