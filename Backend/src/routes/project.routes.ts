import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const projectRoutes = express.Router();

projectRoutes.post('/create', authMiddleware, controllers.projectControllers.create);
projectRoutes.patch('/update/:id', authMiddleware, controllers.projectControllers.update);
projectRoutes.delete('/soft-delete/:id', authMiddleware, controllers.projectControllers.softDelete);
projectRoutes.delete('/delete/:id', authMiddleware, controllers.projectControllers.deleteOne);
projectRoutes.get('/get', controllers.projectControllers.get);
projectRoutes.get('/get/:id', controllers.projectControllers.getOne);

export default projectRoutes;
