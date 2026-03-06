import express from 'express';
import validate from '../middlewares/validate.middleware';
import {
  technologyCreateSchema,
  technologyUpdateSchema,
} from '../validations/technology.validations';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const technologyRoutes = express.Router();

technologyRoutes.post(
  '/create',
  authMiddleware,
  validate(technologyCreateSchema),
  controllers.technologyControllers.create,
);
technologyRoutes.patch(
  '/update/:id',
  authMiddleware,
  validate(technologyUpdateSchema),
  controllers.technologyControllers.update,
);
technologyRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.technologyControllers.softDelete,
);
technologyRoutes.delete('/delete/:id', authMiddleware, controllers.technologyControllers.deleteOne);
technologyRoutes.get('/get', controllers.technologyControllers.get);
technologyRoutes.get('/get/:id', controllers.technologyControllers.getOne);

export default technologyRoutes;
