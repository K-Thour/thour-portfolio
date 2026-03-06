import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const serviceRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: API endpoints for managing Services
 *
 * components:
 *   schemas:
 *     Service:
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
 * /service/create:
 *   post:
 *     summary: Create a new Service
 *     tags: [Service]
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
 * /service/update/{id}:
 *   patch:
 *     summary: Update an existing Service
 *     tags: [Service]
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
 * /service/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Service
 *     tags: [Service]
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
 * /service/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Service
 *     tags: [Service]
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
 * /service/get:
 *   get:
 *     summary: Get a list of Services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */

/**
 * @swagger
 * /service/get/{id}:
 *   get:
 *     summary: Get a Service by ID
 *     tags: [Service]
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
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Not found
 */

serviceRoutes.post('/create', authMiddleware, controllers.serviceControllers.create);
serviceRoutes.patch('/update/:id', authMiddleware, controllers.serviceControllers.update);
serviceRoutes.delete('/soft-delete/:id', authMiddleware, controllers.serviceControllers.softDelete);
serviceRoutes.delete('/delete/:id', authMiddleware, controllers.serviceControllers.deleteOne);
serviceRoutes.get('/get', controllers.serviceControllers.get);
serviceRoutes.get('/get/:id', controllers.serviceControllers.getOne);

export default serviceRoutes;
