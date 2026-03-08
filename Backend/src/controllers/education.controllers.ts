import { Request, Response } from 'express';
import {
  createEducationInput,
  IEducation,
} from '../interface/models/education/education.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const educationDetails: createEducationInput = req.body;
  const result = await services.educationServices.createService(educationDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const educationDetails: IEducation = req.body;
  const id: string = req.params.id as string;
  const result = await services.educationServices.updateService(id, educationDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.educationServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.educationServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.educationServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.educationServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const educationControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default educationControllers;
