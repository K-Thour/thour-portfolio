import express from 'express';
import validate from '../middlewares/validate.middleware';
import {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
} from '../validations/user.validations';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';

const userRoutes = express.Router();

userRoutes.post('/register', validate(userCreateSchema), controllers.userControllers.register);

userRoutes.post('/login', validate(userLoginSchema), controllers.userControllers.login);

userRoutes.get('/me', authMiddleware, controllers.userControllers.getCurrentUser);

userRoutes.patch(
  '/update',
  authMiddleware,
  validate(userUpdateSchema),
  controllers.userControllers.updateCurrentUser,
);

export default userRoutes;
