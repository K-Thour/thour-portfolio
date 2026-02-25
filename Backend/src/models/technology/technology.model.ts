import { model } from 'mongoose';
import ITechnologyModel from '../../interface/models/technology/technology.interface';
import technologySchema from './technology.schema';

const technologyModel = model<ITechnologyModel>('Technology', technologySchema);

export default technologyModel;
