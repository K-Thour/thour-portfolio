import { model } from 'mongoose';
import IContactModel from '../../interface/models/contact/contact.interface';
import contactSchema from './contact.schema';

const contactModel = model<IContactModel>('Contact', contactSchema);

export default contactModel;
