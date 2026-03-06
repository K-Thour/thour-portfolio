import { Request, Response } from 'express';
import { createProjectInput, IProject } from '../interface/models/project/project.interface';
import services from '../services';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const projectDetails: createProjectInput = req.body;
  const result = await services.projectServices.createService(projectDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const projectDetails: IProject = req.body;
  const id: string = req.params.id as string;
  const result = await services.projectServices.updateService(id, projectDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.projectServices.softDeleteService(id, new Date(), userId);
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.projectServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.projectServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.projectServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const projectControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default projectControllers;
