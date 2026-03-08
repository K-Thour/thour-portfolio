import { Request, Response } from 'express';
import { createContactInput, IContact } from '../interface/models/contact/contact.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const contactDetails: createContactInput = req.body;
  const result = await services.contactServices.createService(contactDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const contactDetails: IContact = req.body;
  const id: string = req.params.id as string;
  const result = await services.contactServices.updateService(id, contactDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.contactServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.contactServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.contactServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.contactServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const contactControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default contactControllers;
