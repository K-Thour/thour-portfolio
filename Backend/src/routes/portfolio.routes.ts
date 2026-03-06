import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const portfolioRoutes = express.Router();

portfolioRoutes.post('/create', authMiddleware, controllers.portfolioControllers.create);
portfolioRoutes.patch('/update/:id', authMiddleware, controllers.portfolioControllers.update);
portfolioRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.portfolioControllers.softDelete,
);
portfolioRoutes.delete('/delete/:id', authMiddleware, controllers.portfolioControllers.deleteOne);
portfolioRoutes.get('/get', controllers.portfolioControllers.get);
portfolioRoutes.get('/get/:id', controllers.portfolioControllers.getOne);

export default portfolioRoutes;
