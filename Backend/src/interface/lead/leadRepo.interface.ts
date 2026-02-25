import { IBaseRepo, IBaseRepoParams } from '../common/baseRepo.interface';
import { ICommonResponse } from '../common/common.interface';
import ILeadModel from './lead.interface';

export type ILeadRepo = IBaseRepo<ILeadModel>;

export type ILeadRepoParams = IBaseRepoParams<ILeadModel>;

export type ILeadRepoReturn = ICommonResponse<ILeadModel>;

export type ILeadCommonReturn = ICommonResponse<ILeadModel>;
