import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IProjectModel, { createProjectInput } from '../interface/models/project/project.interface';
import { Types } from 'mongoose';
import { IProjectRepoParams } from '../interface/models/project/projectRepo.interface';
import { uploadBase64ImagesInObject, deleteFromCloudinary } from '../utils/cloudinary.utils';

const createService = (data: createProjectInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    await uploadBase64ImagesInObject(data, 'projects');
    const result = await models.project.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Project'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<IProjectModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const currentProject = await models.project.repo.getOne({
      filter: [{ _id: new Types.ObjectId(id) }],
    });

    await uploadBase64ImagesInObject(data, 'projects');

    if (
      currentProject &&
      currentProject.image &&
      currentProject.image.publicId &&
      data.image &&
      data.image.url
    ) {
      if (currentProject.image.url !== data.image.url) {
        await deleteFromCloudinary(currentProject.image.publicId);
      }
    }

    const result = await models.project.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Project'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.project.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Project'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.project.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Project'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: IProjectRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.project.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Project'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: IProjectRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.project.repo.getOne(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Project'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const projectServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
};

export default projectServices;
