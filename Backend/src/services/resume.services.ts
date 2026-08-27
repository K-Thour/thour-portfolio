import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { STATUS_CODE } from '../constants/statusCode.constant';
import models from '../models';
import IResumeModel, { createResumeInput } from '../interface/models/resume/resume.interface';
import { Types } from 'mongoose';
import { IResumeRepoParams } from '../interface/models/resume/resumeRepo.interface';
import envConstant from '../constants/env.constant';

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
    if (data.isActive === true) {
      await models.resume.repo.deactivateOthers(id);
    }
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

const generateService = (
  name: string,
  description: string,
  jobUrl: string | undefined,
  designType: 'latex' | 'pdf' | 'image' | 'modern' | 'ats' = 'latex',
  latexCode: string | undefined,
  designFileUrl: string | undefined,
  createdBy: Types.ObjectId,
  targetRole?: string,
  selectedProjectIds?: string[],
  selectedExperienceIds?: string[],
) => {
  return asyncCommonWrapper(async () => {
    // 1. Fetch user/developer profile details
    const user = await models.user.repo.getOne({
      filter: [{ _id: createdBy }],
    });
    if (!user) {
      return commonResponse.error(null, 'User profile not found', STATUS_CODE.NOT_FOUND, 0);
    }

    // 2. Fetch all database assets
    const contact =
      (await models.contact.repo.getOne({ filter: [{ isActive: true, isDeleted: false }] })) ||
      (await models.contact.repo.getOne({ filter: [{ isDeleted: false }] }));
    const formattedAddress = contact
      ? [contact.city, contact.state, contact.country]
          .filter(Boolean)
          .map((s: string) => s.trim())
          .join(', ')
      : 'India';
    const projects = await models.project.repo.get({ filter: [{ isDeleted: false }] });
    const servicesList = await models.service.repo.get({ filter: [{ isDeleted: false }] });
    const technologies = await models.technology.repo.get({ filter: [{ isDeleted: false }] });
    const education = await models.education.repo.get({ filter: [{ isDeleted: false }] });
    const experience = await models.experience.repo.get({ filter: [{ isDeleted: false }] });

    // 3. Call Gemini AI helper to select items and generate LaTeX
    const aiResult = await generateResumeAI({
      jobDescription: description,
      jobLink: jobUrl,
      targetRole: targetRole || name,
      selectedProjectIds,
      selectedExperienceIds,
      developerProfile: {
        name: user.name,
        email: contact?.email || user.email,
        phoneNumber: contact?.phone || user.phoneNumber,
        experienceYears: user.experience,
        address: formattedAddress,
        hobbies: user.hobbies || [],
        languages: user.languages || [],
      },
      projects,
      services: servicesList,
      technologies,
      education,
      experience,
    });

    // Convert selected string IDs to ObjectIds, prioritizing user's explicit selection from frontend
    const effectiveProjectIds =
      selectedProjectIds && selectedProjectIds.length > 0
        ? selectedProjectIds
        : aiResult.selectedProjectIds;

    const effectiveExperienceIds =
      selectedExperienceIds && selectedExperienceIds.length > 0
        ? selectedExperienceIds
        : aiResult.selectedExperienceIds || [];

    const projectsUsed = effectiveProjectIds.map((id) => new Types.ObjectId(id));
    const servicesUsed = aiResult.selectedServiceIds.map((id) => new Types.ObjectId(id));
    const technologiesUsed = aiResult.selectedTechnologyIds.map((id) => new Types.ObjectId(id));
    const experiencesUsed = effectiveExperienceIds.map((id) => new Types.ObjectId(id));

    // Create the resume document in DB with dynamic environment API base URL
    const newResumeId = new Types.ObjectId();
    const resumeUrl = `${envConstant.API_BASE_URL}/resume/download/pdf/${newResumeId}`;
    const resumeFormatUrl =
      designFileUrl || `${envConstant.API_BASE_URL}/resume/download/tex/${newResumeId}`;

    const resumeData = {
      _id: newResumeId,
      name,
      description,
      summary: aiResult.tailoredSummary || '',
      targetRole: targetRole || name,
      designType,
      designFileUrl,
      projectCount: projectsUsed.length,
      serviceCount: servicesUsed.length,
      technologyCount: technologiesUsed.length,
      experiencesUsed,
      projectsUsed,
      servicesUsed,
      technologiesUsed,
      resumeUrl,
      resumeFormatUrl,
      jobUrl,
      isActive: true,
      latexCode: latexCode || aiResult.latexCode,
    };

    await models.resume.repo.deactivateOthers(newResumeId.toString());
    const result = await models.resume.repo.create(resumeData as any, createdBy);
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
