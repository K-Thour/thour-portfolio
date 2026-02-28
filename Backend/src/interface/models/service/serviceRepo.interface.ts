import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IServiceModel from './service.interface';

export type IServiceRepo = IBaseRepo<IServiceModel>;

export type IServiceRepoParams = IBaseRepoParams<IServiceModel>;

export type IServiceRepoReturn = ICommonResponse<IServiceModel>;

export type IServiceCommonReturn = ICommonResponse<IServiceModel>;
