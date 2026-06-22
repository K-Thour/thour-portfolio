import { Request, Response } from 'express';
import services from '../services';

const get = async (req: Request, res: Response) => {
  const result = await services.dashboardServices.getService();
  res.status(result.statusCode).json(result);
};

const dashboardControllers = {
  get,
};

export default dashboardControllers;
