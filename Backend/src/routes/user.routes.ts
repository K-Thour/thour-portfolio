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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing Users and Auth
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         experience:
 *           type: number
 *         completedProjects:
 *           type: number
 *         solvedProblems:
 *           type: number
 *         happyClients:
 *           type: number
 *         hobbies:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Validation error or user exists
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login an existing User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       404:
 *         description: User not found or invalid credentials
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current authenticated User
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: Update current authenticated User
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 */

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
