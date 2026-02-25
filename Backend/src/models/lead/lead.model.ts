import { model } from 'mongoose';
import ILeadModel from '../../interface/lead/lead.interface';
import leadSchema from './lead.schema';

const leadModel = model<ILeadModel>('Lead', leadSchema);

export default leadModel;
