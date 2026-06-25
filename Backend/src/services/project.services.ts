import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IProjectModel, { createProjectInput } from '../interface/models/project/project.interface';
import { Types } from 'mongoose';
import { IProjectRepoParams } from '../interface/models/project/projectRepo.interface';
import { uploadBase64ImagesInObject, deleteFromCloudinary } from '../utils/cloudinary.utils';

const resolveRefs = async (data: any) => {
  if (
    data.category &&
    typeof data.category === 'string' &&
    !Types.ObjectId.isValid(data.category)
  ) {
    let service = await models.service.repo.getOne({
      filter: [{ name: { $regex: new RegExp(`^${data.category}$`, 'i') } as any }],
    });
    if (!service) {
      service = await models.service.repo.create(
        {
          name: data.category,
          decription: `${data.category} services`,
          technologies: [],
          iconUrl: { publicId: 'service', url: 'https://placehold.co/100' },
          mainImageUrl: { publicId: 'service', url: 'https://placehold.co/600' },
          imagesUrl: [],
        },
        new Types.ObjectId('60d5ec4934d47d2b2c8b4567'),
      );
    }
    data.category = service._id;
  }

  if (data.techStack && Array.isArray(data.techStack)) {
    const resolvedIds: Types.ObjectId[] = [];
    for (const item of data.techStack) {
      if (typeof item === 'string') {
        if (Types.ObjectId.isValid(item)) {
          resolvedIds.push(new Types.ObjectId(item));
        } else {
          let tech = await models.technology.repo.getOne({
            filter: [{ name: { $regex: new RegExp(`^${item}$`, 'i') } as any }],
          });
          if (!tech) {
            tech = await models.technology.repo.create(
              {
                name: item,
                description: `${item} technology`,
                category: 'Development',
                iconUrl: { publicId: 'tech', url: 'https://placehold.co/100' },
                isActive: true,
              },
              new Types.ObjectId('60d5ec4934d47d2b2c8b4567'),
            );
          }
          resolvedIds.push(tech._id);
        }
      }
    }
    data.techStack = resolvedIds;
  }
};

const createService = (data: createProjectInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    await resolveRefs(data);
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
    await resolveRefs(data);
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

    // Preserve features if not provided in update payload, or if an empty
    // array is sent but the project already has features saved (prevents
    // accidental wipe when editing other fields without touching features)
    if (currentProject) {
      if (data.features === undefined) {
        data.features = currentProject.features || [];
      } else if (
        Array.isArray(data.features) &&
        data.features.length === 0 &&
        currentProject.features &&
        currentProject.features.length > 0
      ) {
        data.features = currentProject.features;
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
    const paramsWithPopulate: IProjectRepoParams = {
      ...params,
      populate: [
        { path: 'category', select: 'name iconUrl' },
        { path: 'techStack', select: 'name iconUrl category' },
      ],
      select:
        'title category description image device year client fullDescription features role outcome workingUrl githubUrl screenshots projectMetric projectTestimonial techStack isDeleted isActive deletedBy createdBy updatedBy deletedAt',
    };
    const result = await models.project.repo.get(paramsWithPopulate);
    // Ensure features is always an array
    const normalizedResult = result.map((project: any) => ({
      ...project,
      features: Array.isArray(project.features) ? project.features : [],
    }));
    return commonResponse.success(
      normalizedResult,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Project'),
      STATUS_CODE.OK,
      normalizedResult.length,
    );
  });
};

const getOneService = (params?: IProjectRepoParams) => {
  return asyncCommonWrapper(async () => {
    const paramsWithPopulate: IProjectRepoParams = {
      ...params,
      populate: [
        { path: 'category', select: 'name iconUrl' },
        { path: 'techStack', select: 'name iconUrl category' },
      ],
      select:
        'title category description image device year client fullDescription features role outcome workingUrl githubUrl screenshots projectMetric projectTestimonial techStack isDeleted isActive deletedBy createdBy updatedBy deletedAt',
    };
    const result = await models.project.repo.getOne(paramsWithPopulate);
    // Ensure features is always an array
    if (result && !Array.isArray(result.features)) {
      result.features = [];
    }
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
