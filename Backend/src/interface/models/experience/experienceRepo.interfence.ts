import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IExperienceModel from './experience.interface';

export type IExperienceRepo = IBaseRepo<IExperienceModel>;

export type IExperienceRepoParams = IBaseRepoParams<IExperienceModel>;

export type IExperienceRepoReturn = ICommonResponse<IExperienceModel>;

export type IExperienceCommonReturn = ICommonResponse<IExperienceModel>;
