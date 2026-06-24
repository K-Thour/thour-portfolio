import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IServiceModel, { createServiceInput } from '../interface/models/service/service.interface';
import { Types } from 'mongoose';
import { IServiceRepoParams } from '../interface/models/service/serviceRepo.interface';
import { uploadBase64ImagesInObject, deleteFromCloudinary } from '../utils/cloudinary.utils';

const createService = (data: createServiceInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    await uploadBase64ImagesInObject(data, 'services');
    const result = await models.service.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Service'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<IServiceModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const currentService = await models.service.repo.getOne({
      filter: [{ _id: new Types.ObjectId(id) }],
    });

    await uploadBase64ImagesInObject(data, 'services');

    if (currentService) {
      if (
        currentService.iconUrl &&
        currentService.iconUrl.publicId &&
        data.iconUrl &&
        data.iconUrl.url
      ) {
        if (currentService.iconUrl.url !== data.iconUrl.url) {
          await deleteFromCloudinary(currentService.iconUrl.publicId);
        }
      }
      if (
        currentService.mainImageUrl &&
        currentService.mainImageUrl.publicId &&
        data.mainImageUrl &&
        data.mainImageUrl.url
      ) {
        if (currentService.mainImageUrl.url !== data.mainImageUrl.url) {
          await deleteFromCloudinary(currentService.mainImageUrl.publicId);
        }
      }
      if (currentService.imagesUrl && data.imagesUrl) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newUrls = new Set(data.imagesUrl.map((img: any) => img.url));
        for (const oldImg of currentService.imagesUrl) {
          if (oldImg.publicId && !newUrls.has(oldImg.url)) {
            await deleteFromCloudinary(oldImg.publicId);
          }
        }
      }
    }

    const result = await models.service.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Service'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.service.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Service'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.service.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Service'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: IServiceRepoParams) => {
  return asyncCommonWrapper(async () => {
    const paramsWithPopulate: IServiceRepoParams = {
      ...params,
      populate: { path: 'technologies', select: 'name iconUrl category' },
    };
    const result = await models.service.repo.get(paramsWithPopulate);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Service'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: IServiceRepoParams) => {
  return asyncCommonWrapper(async () => {
    const paramsWithPopulate: IServiceRepoParams = {
      ...params,
      populate: { path: 'technologies', select: 'name iconUrl category' },
    };
    const result = await models.service.repo.getOne(paramsWithPopulate);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Service'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const serviceServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
};

export default serviceServices;
