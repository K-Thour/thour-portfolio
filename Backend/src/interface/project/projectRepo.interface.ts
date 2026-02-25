import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../common/common.interface';
import IProjectModel from './project.interface';
import { IProjectScreenshotRepo } from './projectScreenshot/projectScreenshotRepo.interface';
import { IProjectMetricRepo } from './projectMetric/projectMetricRepo.interface';
import { IProjectTestimonialRepo } from './projectTestimonial.ts/projectTestimonialRepo.interface';

export interface IProjectRepo extends IBaseRepo<IProjectModel> {
  projectScreenshotRepo: IProjectScreenshotRepo;
  projectMetricRepo: IProjectMetricRepo;
  projectTestimonialRepo: IProjectTestimonialRepo;
}

export type IProjectRepoParams = IBaseRepoParams<IProjectModel>;

export type IProjectRepoReturn = ICommonResponse<IProjectModel>;

export type IProjectCommonReturn = ICommonResponse<IProjectModel>;
