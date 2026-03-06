import { Request, Response } from 'express';
import {
  createPortfolioInput,
  IPortfolio,
} from '../interface/models/portfolio/portfolio.interface';
import services from '../services';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const portfolioDetails: createPortfolioInput = req.body;
  const result = await services.portfolioServices.createService(portfolioDetails, userId);
  res.status(result.statusCode).json(result);
};
const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const portfolioDetails: IPortfolio = req.body;
  const id: string = req.params.id as string;
  const result = await services.portfolioServices.updateService(id, portfolioDetails, userId);
  res.status(result.statusCode).json(result);
};
const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.portfolioServices.softDeleteService(id, new Date(), userId);
  res.status(result.statusCode).json(result);
};
const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.portfolioServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};
const get = async (req: Request, res: Response) => {
  const result = await services.portfolioServices.getService(req.query);
  res.status(result.statusCode).json(result);
};
const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.portfolioServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const portfolioControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
};

export default portfolioControllers;
