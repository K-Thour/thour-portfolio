import { model } from 'mongoose';
import userSchema from './user.schema';
import IUserModel from '../../interface/models/user/user.interface';

const userModel = model<IUserModel>('User', userSchema);

export default userModel;
