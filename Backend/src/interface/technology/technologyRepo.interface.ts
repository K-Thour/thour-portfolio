import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../common/common.interface';
import { ITechnologyModel } from './technology.interface';

export type ITechnologyRepo = IBaseRepo<ITechnologyModel>;

export type ITechnologyRepoParams = IBaseRepoParams<ITechnologyModel>;

export type ITechnologyRepoReturn = ICommonResponse<ITechnologyModel>;

export type ITechnologyCommonReturn = ICommonResponse<ITechnologyModel>;
