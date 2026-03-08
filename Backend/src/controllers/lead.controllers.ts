import { Request, Response } from 'express';
import { createLeadInput, ILead } from '../interface/models/lead/lead.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const leadDetails: createLeadInput = req.body;
  const result = await services.leadServices.createService(leadDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const leadDetails: ILead = req.body;
  const id: string = req.params.id as string;
  const result = await services.leadServices.updateService(id, leadDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.leadServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.leadServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.leadServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.leadServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const leadControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default leadControllers;
