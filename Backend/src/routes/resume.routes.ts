import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const resumeRoutes = express.Router();

resumeRoutes.post('/create', authMiddleware, controllers.resumeControllers.create);
resumeRoutes.patch('/update/:id', authMiddleware, controllers.resumeControllers.update);
resumeRoutes.delete('/soft-delete/:id', authMiddleware, controllers.resumeControllers.softDelete);
resumeRoutes.delete('/delete/:id', authMiddleware, controllers.resumeControllers.deleteOne);
resumeRoutes.get('/get', controllers.resumeControllers.get);
resumeRoutes.get('/get/:id', controllers.resumeControllers.getOne);

export default resumeRoutes;
