import { Types } from 'mongoose';
import { EEducationType, EGradeType, ESchoolBoard, EStream } from '../../common/common.enum';
import { ICommonModel } from '../../common/common.interface';

export interface IEducation {
  level: EEducationType;
  degree?: string;
  field_of_study?: string;
  stream?: EStream;
  institution: string;
  board?: ESchoolBoard;
  startYear: Date;
  endYear: Date | 'pursuing';
  isPursuing: boolean;
  gradeType: EGradeType;
  grade?: string;
  description: string;
  isDeleted: boolean;
}

interface IEducationModel extends IEducation, ICommonModel {
  deletedAt: Date;
  createdBy: Types.ObjectId;
  deletedBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

export default IEducationModel;
