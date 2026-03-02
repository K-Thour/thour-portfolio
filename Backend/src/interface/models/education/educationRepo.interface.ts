import { ICommonResponse } from '../../common/common.interface';
import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import IEducationModel from './education.interface';

export type IEducationRepo = IBaseRepo<IEducationModel>;

export type IEducationRepoParams = IBaseRepoParams<IEducationModel>;

export type IEducationRepoReturn = ICommonResponse<IEducationModel>;

export type IEducationCommonReturn = ICommonResponse<IEducationModel>;
