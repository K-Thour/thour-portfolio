import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IResumeModel, { createResumeInput } from '../interface/models/resume/resume.interface';
import { Types } from 'mongoose';
import { IResumeRepoParams } from '../interface/models/resume/resumeRepo.interface';

const createService = (data: createResumeInput, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.create(data, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Resume'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const updateService = (id: string, data: Partial<IResumeModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Resume'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDeleteService = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Resume'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOneService = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('Resume'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const getService = (params: IResumeRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Resume'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getOneService = (params?: IResumeRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.resume.repo.getOne(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Resume'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

import { generateResumeAI } from '../utils/gemini.utils';

const generateService = (name: string, description: string, jobUrl: string | undefined, createdBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    // 1. Fetch user/developer profile details
    const user = await models.user.repo.getOne({
      filter: [{ _id: createdBy }]
    });
    if (!user) {
      return commonResponse.error(null, 'User profile not found', STATUS_CODE.NOT_FOUND, 0);
    }

    // 2. Fetch all database assets
    const projects = await models.project.repo.get({ filter: [{ isDeleted: false }] });
    const servicesList = await models.service.repo.get({ filter: [{ isDeleted: false }] });
    const technologies = await models.technology.repo.get({ filter: [{ isDeleted: false }] });
    const education = await models.education.repo.get({ filter: [{ isDeleted: false }] });
    const experience = await models.experience.repo.get({ filter: [{ isDeleted: false }] });

    // 3. Call Gemini AI helper to select items and generate LaTeX
    const aiResult = await generateResumeAI({
      jobDescription: description,
      developerProfile: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        experienceYears: user.experience,
        hobbies: user.hobbies || [],
        languages: user.languages || [],
      },
      projects,
      services: servicesList,
      technologies,
      education,
      experience,
    });

    // Convert selected string IDs to ObjectIds
    const projectsUsed = aiResult.selectedProjectIds.map(id => new Types.ObjectId(id));
    const servicesUsed = aiResult.selectedServiceIds.map(id => new Types.ObjectId(id));
    const technologiesUsed = aiResult.selectedTechnologyIds.map(id => new Types.ObjectId(id));

    // Create the resume document in DB
    const resumeData = {
      name,
      projectCount: projectsUsed.length,
      serviceCount: servicesUsed.length,
      technologyCount: technologiesUsed.length,
      projectsUsed,
      servicesUsed,
      technologiesUsed,
      resumeUrl: 'http://localhost:3000/api/v1/resume/download/placeholder.pdf', // Placeholder
      resumeFormatUrl: 'http://localhost:3000/api/v1/resume/download/placeholder.tex', // Placeholder
      jobUrl,
      isActive: true,
      latexCode: aiResult.latexCode,
    };

    const result = await models.resume.repo.create(resumeData, createdBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.createdSuccessfully('Resume'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const resumeServices = {
  createService,
  updateService,
  softDeleteService,
  deleteOneService,
  getService,
  getOneService,
  generateService,
};

export default resumeServices;
