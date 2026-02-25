import ITechnologyModel from '../../interface/technology/technology.interface';
import { ICommonModelIndex } from '../common/common.index';
import technologyModel from './technology.model';
import technologyRepository from './technology.repository';
import technologySchema from './technology.schema';

export default <ICommonModelIndex<ITechnologyModel>>{
  model: technologyModel,
  repo: technologyRepository,
  schema: technologySchema,
};
