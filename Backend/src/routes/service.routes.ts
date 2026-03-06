import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const serviceRoutes = express.Router();

serviceRoutes.post('/create', authMiddleware, controllers.serviceControllers.create);
serviceRoutes.patch('/update/:id', authMiddleware, controllers.serviceControllers.update);
serviceRoutes.delete('/soft-delete/:id', authMiddleware, controllers.serviceControllers.softDelete);
serviceRoutes.delete('/delete/:id', authMiddleware, controllers.serviceControllers.deleteOne);
serviceRoutes.get('/get', controllers.serviceControllers.get);
serviceRoutes.get('/get/:id', controllers.serviceControllers.getOne);

export default serviceRoutes;
