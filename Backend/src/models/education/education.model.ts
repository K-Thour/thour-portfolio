import { model } from 'mongoose';
import IEducationModel from '../../interface/models/education/education.interface';
import educationShema from './education.schema';

const educationModel = model<IEducationModel>('education', educationShema);

export default educationModel;
