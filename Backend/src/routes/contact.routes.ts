import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const contactRoutes = express.Router();

contactRoutes.post('/create', authMiddleware, controllers.contactControllers.create);
contactRoutes.patch('/update/:id', authMiddleware, controllers.contactControllers.update);
contactRoutes.delete('/soft-delete/:id', authMiddleware, controllers.contactControllers.softDelete);
contactRoutes.delete('/delete/:id', authMiddleware, controllers.contactControllers.deleteOne);
contactRoutes.get('/get', controllers.contactControllers.get);
contactRoutes.get('/get/:id', controllers.contactControllers.getOne);

export default contactRoutes;
