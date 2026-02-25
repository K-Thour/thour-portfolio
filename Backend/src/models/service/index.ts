import { ICommonModelIndex } from '../common/common.index';
import IServiceModel from '../../interface/models/service/service.interface';
import serviceModel from './service.model';
import serviceRepository from './service.repository';
import serviceSchema from './service.schema';

export default <ICommonModelIndex<IServiceModel>>{
  model: serviceModel,
  repo: serviceRepository,
  schema: serviceSchema,
};
