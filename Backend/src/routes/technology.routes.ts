import express from 'express';
import validate from '../middlewares/validate.middleware';
import {
  technologyCreateSchema,
  technologyUpdateSchema,
} from '../validations/technology.validations';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const technologyRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Technology
 *   description: API endpoints for managing Technologys
 *
 * components:
 *   schemas:
 *     Technology:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /technology/create:
 *   post:
 *     summary: Create a new Technology
 *     tags: [Technology]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /technology/update/{id}:
 *   patch:
 *     summary: Update an existing Technology
 *     tags: [Technology]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /technology/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Technology
 *     tags: [Technology]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /technology/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Technology
 *     tags: [Technology]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /technology/get:
 *   get:
 *     summary: Get a list of Technologys
 *     tags: [Technology]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technology'
 */

/**
 * @swagger
 * /technology/get/{id}:
 *   get:
 *     summary: Get a Technology by ID
 *     tags: [Technology]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technology'
 *       404:
 *         description: Not found
 */

technologyRoutes.post(
  '/create',
  authMiddleware,
  validate(technologyCreateSchema),
  controllers.technologyControllers.create,
);
technologyRoutes.patch(
  '/update/:id',
  authMiddleware,
  validate(technologyUpdateSchema),
  controllers.technologyControllers.update,
);
technologyRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.technologyControllers.softDelete,
);
technologyRoutes.delete('/delete/:id', authMiddleware, controllers.technologyControllers.deleteOne);
technologyRoutes.get('/get', controllers.technologyControllers.get);
technologyRoutes.get('/get/:id', controllers.technologyControllers.getOne);

export default technologyRoutes;
