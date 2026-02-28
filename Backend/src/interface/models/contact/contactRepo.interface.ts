import IContactModel from './contact.interface';
import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';

export type IContactRepo = IBaseRepo<IContactModel>;

export type IContactRepoParams = IBaseRepoParams<IContactModel>;

export type IContactRepoReturn = ICommonResponse<IContactModel>;

export type IContactCommonReturn = ICommonResponse<IContactModel>;
