import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const educationRoutes = express.Router();

educationRoutes.post('/create', authMiddleware, controllers.educationControllers.create);
educationRoutes.patch('/update/:id', authMiddleware, controllers.educationControllers.update);
educationRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.educationControllers.softDelete,
);
educationRoutes.delete('/delete/:id', authMiddleware, controllers.educationControllers.deleteOne);
educationRoutes.get('/get', controllers.educationControllers.get);
educationRoutes.get('/get/:id', controllers.educationControllers.getOne);

export default educationRoutes;
