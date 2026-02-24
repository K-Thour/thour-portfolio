import { model } from 'mongoose';
import userSchema from './user.schema';
import IUserModel from '../../interface/user/user.interface';

const userModel = model<IUserModel>('user', userSchema);

export default userModel;
