import { IBaseRepo, IBaseRepoParams } from '../../common/baseRepo.interface';
import { ICommonResponse } from '../../../common/common.interface';
import IProjectTestimonialModel from './projectTestimonial.interface';

export type IProjectTestimonialRepo = IBaseRepo<IProjectTestimonialModel>;

export type IProjectTestimonialRepoParams = IBaseRepoParams<IProjectTestimonialModel>;

export type IProjectTestimonialRepoReturn = ICommonResponse<IProjectTestimonialModel>;

export type IProjectTestimonialCommonReturn = ICommonResponse<IProjectTestimonialModel>;
