import { IBaseRepo, IBaseRepoParams } from '../../common/baseRepo.interface';
import { ICommonResponse } from '../../../common/common.interface';
import IProjectScreenshotModel from './projectScreenshot.interface';

export type IProjectScreenshotRepo = IBaseRepo<IProjectScreenshotModel>;

export type IProjectScreenshotRepoParams = IBaseRepoParams<IProjectScreenshotModel>;

export type IProjectScreenshotRepoReturn = ICommonResponse<IProjectScreenshotModel>;

export type IProjectScreenshotCommonReturn = ICommonResponse<IProjectScreenshotModel>;
