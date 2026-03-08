import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IEducationModel, {
  createEducationInput,
} from '../interface/models/education/education.interface';
import { Types } from 'mongoose';
import { IEducationRepoParams } from '../interface/models/education/educationRepo.interface';

const createService = (data: createEducationInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Education'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<IEducationModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Education'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Education'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Education'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: IEducationRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Education'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: IEducationRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.education.repo.getOne(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Education'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const educationServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
};

export default educationServices;
