import IContactModel from '../../interface/models/contact/contact.interface';
import { ICommonModelIndex } from '../common/common.index';
import contactModel from './contact.model';
import contactRepository from './contact.repository';
import contactSchema from './contact.schema';

export default <ICommonModelIndex<IContactModel>>{
  model: contactModel,
  repo: contactRepository,
  schema: contactSchema,
};
