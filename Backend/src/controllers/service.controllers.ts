import { Request, Response } from 'express';
import { createServiceInput, IService } from '../interface/models/service/service.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const serviceDetails: createServiceInput = req.body;
  const result = await services.serviceServices.createService(serviceDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const serviceDetails: IService = req.body;
  const id: string = req.params.id as string;
  const result = await services.serviceServices.updateService(id, serviceDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.serviceServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.serviceServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.serviceServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.serviceServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const serviceControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default serviceControllers;
