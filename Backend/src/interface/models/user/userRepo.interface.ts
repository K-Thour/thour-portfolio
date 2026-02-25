import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IUserModel from './user.interface';

export type IUserRepo = IBaseRepo<IUserModel>;

export type IUserRepoParams = IBaseRepoParams<IUserModel>;

export type IUserRepoReturn = ICommonResponse<IUserModel>;

export type IUserCommonReturn = ICommonResponse<IUserModel>;
