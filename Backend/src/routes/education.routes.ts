import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const educationRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: API endpoints for managing Educations
 *
 * components:
 *   schemas:
 *     Education:
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
 * /education/create:
 *   post:
 *     summary: Create a new Education
 *     tags: [Education]
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
 * /education/update/{id}:
 *   patch:
 *     summary: Update an existing Education
 *     tags: [Education]
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
 * /education/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Education
 *     tags: [Education]
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
 * /education/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Education
 *     tags: [Education]
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
 * /education/get:
 *   get:
 *     summary: Get a list of Educations
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 */

/**
 * @swagger
 * /education/get/{id}:
 *   get:
 *     summary: Get a Education by ID
 *     tags: [Education]
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
 *               $ref: '#/components/schemas/Education'
 *       404:
 *         description: Not found
 */

educationRoutes.post('/create', authMiddleware, controllers.educationControllers.create);
educationRoutes.patch('/update/:id', authMiddleware, controllers.educationControllers.update);
educationRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.educationControllers.softDelete,
);
educationRoutes.delete('/delete/:id', authMiddleware, controllers.educationControllers.deleteOne);
educationRoutes.get('/get', controllers.educationControllers.get);
educationRoutes.get('/get/:id', controllers.educationControllers.getOne);

export default educationRoutes;
