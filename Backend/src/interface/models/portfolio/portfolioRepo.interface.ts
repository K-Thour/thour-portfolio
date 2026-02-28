import { ICommonResponse } from '../../common/common.interface';
import { IBaseRepo } from '../common/baseRepo.interface';
import { IBaseRepoParams } from '../common/baseRepo.interface';
import { IPortfolioModel } from './portfolio.interface';

export type IPortfolioRepo = IBaseRepo<IPortfolioModel>;

export type IPortfolioRepoParams = IBaseRepoParams<IPortfolioModel>;

export type IPortfolioRepoReturn = ICommonResponse<IPortfolioModel>;

export type IPortfolioCommonReturn = ICommonResponse<IPortfolioModel>;
