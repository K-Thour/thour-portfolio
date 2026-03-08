import { Request, Response } from 'express';
import { createResumeInput, IResume } from '../interface/models/resume/resume.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const resumeDetails: createResumeInput = req.body;
  const result = await services.resumeServices.createService(resumeDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const resumeDetails: IResume = req.body;
  const id: string = req.params.id as string;
  const result = await services.resumeServices.updateService(id, resumeDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.resumeServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.resumeServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.resumeServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.resumeServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const resumeControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default resumeControllers;
