import { IBaseRepo, IBaseRepoParams } from '../../common/baseRepo.interface';
import { ICommonResponse } from '../../common/common.interface';
import IProjectMetricModel from './projectMetric.interface';

export type IProjectMetricRepo = IBaseRepo<IProjectMetricModel>;

export type IProjectMetricRepoParams = IBaseRepoParams<IProjectMetricModel>;

export type IProjectMetricRepoReturn = ICommonResponse<IProjectMetricModel>;

export type IProjectMetricCommonReturn = ICommonResponse<IProjectMetricModel>;
