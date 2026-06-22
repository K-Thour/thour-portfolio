import { Request, Response } from 'express';
import services from '../services';

const upload = async (req: Request, res: Response) => {
  const { image } = req.body;
  const result = await services.imageServices.uploadService(image);
  res.status(result.statusCode).json(result);
};

const imageControllers = {
  upload,
};

export default imageControllers;
