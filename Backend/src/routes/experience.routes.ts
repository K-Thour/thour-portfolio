import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const experienceRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Experience
 *   description: API endpoints for managing Experiences
 *
 * components:
 *   schemas:
 *     Experience:
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
 * /experience/create:
 *   post:
 *     summary: Create a new Experience
 *     tags: [Experience]
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
 * /experience/update/{id}:
 *   patch:
 *     summary: Update an existing Experience
 *     tags: [Experience]
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
 * /experience/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Experience
 *     tags: [Experience]
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
 * /experience/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Experience
 *     tags: [Experience]
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
 * /experience/get:
 *   get:
 *     summary: Get a list of Experiences
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 */

/**
 * @swagger
 * /experience/get/{id}:
 *   get:
 *     summary: Get a Experience by ID
 *     tags: [Experience]
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
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Not found
 */

experienceRoutes.post('/create', authMiddleware, controllers.experienceControllers.create);
experienceRoutes.patch('/update/:id', authMiddleware, controllers.experienceControllers.update);
experienceRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.experienceControllers.softDelete,
);
experienceRoutes.delete('/delete/:id', authMiddleware, controllers.experienceControllers.deleteOne);
experienceRoutes.get('/get', controllers.experienceControllers.get);
experienceRoutes.get('/get/:id', controllers.experienceControllers.getOne);

export default experienceRoutes;
