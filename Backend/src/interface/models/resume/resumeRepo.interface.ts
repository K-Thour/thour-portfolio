import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IResumeModel from './resume.interface';

export interface IResumeRepo extends IBaseRepo<IResumeModel> {
  deactivateOthers(exceptId: string): Promise<void>;
}

export type IResumeRepoParams = IBaseRepoParams<IResumeModel>;

export type IResumeRepoReturn = ICommonResponse<IResumeModel>;

export type IResumeCommonReturn = ICommonResponse<IResumeModel>;
