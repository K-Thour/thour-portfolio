import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const projectRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: API endpoints for managing Projects
 *
 * components:
 *   schemas:
 *     Project:
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
 * /project/create:
 *   post:
 *     summary: Create a new Project
 *     tags: [Project]
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
 * /project/update/{id}:
 *   patch:
 *     summary: Update an existing Project
 *     tags: [Project]
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
 * /project/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Project
 *     tags: [Project]
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
 * /project/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Project
 *     tags: [Project]
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
 * /project/get:
 *   get:
 *     summary: Get a list of Projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /project/get/{id}:
 *   get:
 *     summary: Get a Project by ID
 *     tags: [Project]
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
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Not found
 */

projectRoutes.post('/create', authMiddleware, controllers.projectControllers.create);
projectRoutes.patch('/update/:id', authMiddleware, controllers.projectControllers.update);
projectRoutes.delete('/soft-delete/:id', authMiddleware, controllers.projectControllers.softDelete);
projectRoutes.delete('/delete/:id', authMiddleware, controllers.projectControllers.deleteOne);
projectRoutes.get('/get', controllers.projectControllers.get);
projectRoutes.get('/get/:id', controllers.projectControllers.getOne);

export default projectRoutes;
