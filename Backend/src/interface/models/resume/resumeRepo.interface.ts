import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IResumeModel from './resume.interface';

export type IResumeRepo = IBaseRepo<IResumeModel>;

export type IResumeRepoParams = IBaseRepoParams<IResumeModel>;

export type IResumeRepoReturn = ICommonResponse<IResumeModel>;

export type IResumeCommonReturn = ICommonResponse<IResumeModel>;
