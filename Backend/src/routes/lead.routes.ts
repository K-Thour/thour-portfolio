import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const leadRoutes = express.Router();

leadRoutes.post('/create', authMiddleware, controllers.leadControllers.create);
leadRoutes.patch('/update/:id', authMiddleware, controllers.leadControllers.update);
leadRoutes.delete('/soft-delete/:id', authMiddleware, controllers.leadControllers.softDelete);
leadRoutes.delete('/delete/:id', authMiddleware, controllers.leadControllers.deleteOne);
leadRoutes.get('/get', controllers.leadControllers.get);
leadRoutes.get('/get/:id', controllers.leadControllers.getOne);

export default leadRoutes;
