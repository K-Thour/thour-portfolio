import { Request, Response } from 'express';
import {
  createExperienceInput,
  IExperience,
} from '../interface/models/experience/experience.interface';
import services from '../services';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const experienceDetails: createExperienceInput = req.body;
  const result = await services.experienceServices.createService(experienceDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const experienceDetails: IExperience = req.body;
  const id: string = req.params.id as string;
  const result = await services.experienceServices.updateService(id, experienceDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.experienceServices.softDeleteService(id, new Date(), userId);
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.experienceServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.experienceServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.experienceServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const experienceControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default experienceControllers;
