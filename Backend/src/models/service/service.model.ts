import { model } from 'mongoose';
import IServiceModel from '../../interface/models/service/service.interface';
import serviceSchema from './service.schema';

const serviceModel = model<IServiceModel>('Service', serviceSchema);

export default serviceModel;
