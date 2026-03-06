import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const resumeRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resume
 *   description: API endpoints for managing Resumes
 *
 * components:
 *   schemas:
 *     Resume:
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
 * /resume/create:
 *   post:
 *     summary: Create a new Resume
 *     tags: [Resume]
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
 * /resume/update/{id}:
 *   patch:
 *     summary: Update an existing Resume
 *     tags: [Resume]
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
 * /resume/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Resume
 *     tags: [Resume]
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
 * /resume/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Resume
 *     tags: [Resume]
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
 * /resume/get:
 *   get:
 *     summary: Get a list of Resumes
 *     tags: [Resume]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resume'
 */

/**
 * @swagger
 * /resume/get/{id}:
 *   get:
 *     summary: Get a Resume by ID
 *     tags: [Resume]
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
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Not found
 */

resumeRoutes.post('/create', authMiddleware, controllers.resumeControllers.create);
resumeRoutes.patch('/update/:id', authMiddleware, controllers.resumeControllers.update);
resumeRoutes.delete('/soft-delete/:id', authMiddleware, controllers.resumeControllers.softDelete);
resumeRoutes.delete('/delete/:id', authMiddleware, controllers.resumeControllers.deleteOne);
resumeRoutes.get('/get', controllers.resumeControllers.get);
resumeRoutes.get('/get/:id', controllers.resumeControllers.getOne);

export default resumeRoutes;
