import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const experienceRoutes = express.Router();

experienceRoutes.post('/create', authMiddleware, controllers.experienceControllers.create);
experienceRoutes.patch('/update/:id', authMiddleware, controllers.experienceControllers.update);
experienceRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.experienceControllers.softDelete,
);
experienceRoutes.delete('/delete/:id', authMiddleware, controllers.experienceControllers.deleteOne);
experienceRoutes.get('/get', controllers.experienceControllers.get);
experienceRoutes.get('/get/:id', controllers.experienceControllers.getOne);

export default experienceRoutes;
