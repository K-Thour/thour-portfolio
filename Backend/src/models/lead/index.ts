import ILeadModel from '../../interface/lead/lead.interface';
import { ICommonModelIndex } from '../common/common.index';
import leadModel from './lead.model';
import leadRespository from './lead.repository';
import leadSchema from './lead.schema';

export default <ICommonModelIndex<ILeadModel>>{
  repo: leadRespository,
  model: leadModel,
  schema: leadSchema,
};
