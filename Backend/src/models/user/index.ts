import IUserModel from '../../interface/models/user/user.interface';
import { ICommonModelIndex } from '../common/common.index';
import userModel from './user.model';
import userRepository from './user.repository';
import userSchema from './user.schema';

export default <ICommonModelIndex<IUserModel>>{
  model: userModel,
  repo: userRepository,
  schema: userSchema,
};
