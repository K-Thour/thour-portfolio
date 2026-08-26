import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IProjectModel, { createProjectInput } from '../interface/models/project/project.interface';
import { Types } from 'mongoose';
import { IProjectRepoParams } from '../interface/models/project/projectRepo.interface';
import { uploadBase64ImagesInObject, deleteFromCloudinary } from '../utils/cloudinary.utils';

const resolveRefs = async (data: Partial<IProjectModel>) => {
  const category = (data as any).category; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (category) {
    if (typeof category === 'string') {
      if (Types.ObjectId.isValid(category)) {
        data.category = new Types.ObjectId(category);
      } else {
        const catName = category.trim();
        let service = await models.service.repo.getOne({
          filter: [{ name: { $regex: new RegExp(`^${catName}$`, 'i') } as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
        });
        if (!service) {
          service = await models.service.repo.create(
            {
              name: catName,
              decription: `${catName} services`,
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
    } else if (typeof category === 'object' && ('_id' in category || 'id' in category)) {
      const catId = category._id || category.id;
      if (Types.ObjectId.isValid(catId)) {
        data.category = new Types.ObjectId(catId);
      }
    }
  }

  const rawImage = (data as any).image; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (rawImage) {
    if (typeof rawImage === 'string') {
      data.image = {
        publicId: 'project-main',
        url: rawImage,
      };
    } else if (typeof rawImage === 'object') {
      data.image = {
        publicId: rawImage.publicId || 'project-main',
        url: rawImage.url || '',
      };
    }
  }

  const rawTechStack = (data as any).techStack; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (rawTechStack && Array.isArray(rawTechStack)) {
    const resolvedIds: Types.ObjectId[] = [];
    for (const item of rawTechStack) {
      if (typeof item === 'string') {
        if (Types.ObjectId.isValid(item)) {
          resolvedIds.push(new Types.ObjectId(item));
        } else {
          const techName = item.trim();
          let tech = await models.technology.repo.getOne({
            filter: [{ name: { $regex: new RegExp(`^${techName}$`, 'i') } as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
          });
          if (!tech) {
            tech = await models.technology.repo.create(
              {
                name: techName,
                description: `${techName} technology`,
                category: 'Development',
                iconUrl: { publicId: 'tech', url: 'https://placehold.co/100' },
                isActive: true,
              },
              new Types.ObjectId('60d5ec4934d47d2b2c8b4567'),
            );
          }
          resolvedIds.push(tech._id);
        }
      } else if (item instanceof Types.ObjectId) {
        resolvedIds.push(item);
      } else if (item && typeof item === 'object') {
        const idVal = item._id || item.id;
        const nameVal = item.name || item.title;
        if (idVal && Types.ObjectId.isValid(idVal)) {
          resolvedIds.push(new Types.ObjectId(idVal));
        } else if (nameVal && typeof nameVal === 'string') {
          const techName = nameVal.trim();
          let tech = await models.technology.repo.getOne({
            filter: [{ name: { $regex: new RegExp(`^${techName}$`, 'i') } as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
          });
          if (!tech) {
            tech = await models.technology.repo.create(
              {
                name: techName,
                description: `${techName} technology`,
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
        'title subtitle category description image device year client fullDescription features role outcome workingUrl githubUrl screenshots projectMetric projectTestimonial techStack isDeleted isActive deletedBy createdBy updatedBy deletedAt',
    };
    const result = await models.project.repo.get(paramsWithPopulate);
    // Ensure subtitle and features are always normalized
    const normalizedResult = result.map((project: any) => {
      const doc = project.toObject ? project.toObject() : project;
      return {
        ...doc,
        subtitle: doc.subtitle || '',
        features: Array.isArray(doc.features) ? doc.features : [],
      };
    });
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
        'title subtitle category description image device year client fullDescription features role outcome workingUrl githubUrl screenshots projectMetric projectTestimonial techStack isDeleted isActive deletedBy createdBy updatedBy deletedAt',
    };
    const result = await models.project.repo.getOne(paramsWithPopulate);
    if (!result) {
      return commonResponse.success(
        null,
        MESSAGES_COMMON_UTIL.fetchedSuccessfully('Project'),
        STATUS_CODE.OK,
        0,
      );
    }
    const doc = (result as any).toObject ? (result as any).toObject() : result;
    const normalized = {
      ...doc,
      subtitle: doc.subtitle || '',
      features: Array.isArray(doc.features) ? doc.features : [],
    };
    return commonResponse.success(
      normalized,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Project'),
      STATUS_CODE.OK,
      1,
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
