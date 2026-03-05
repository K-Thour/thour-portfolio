import express from 'express';
import validate from '../middlewares/validate.middleware';
import {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
} from '../validations/user.validations';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', validate(userCreateSchema), controllers.userControllers.register);

router.post('/login', validate(userLoginSchema), controllers.userControllers.login);

router.get('/me', authMiddleware, controllers.userControllers.getCurrentUser);

router.patch(
  '/update',
  authMiddleware,
  validate(userUpdateSchema),
  controllers.userControllers.updateCurrentUser,
);

export default router;
