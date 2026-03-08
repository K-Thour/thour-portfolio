import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const leadRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lead
 *   description: API endpoints for managing Leads
 *
 * components:
 *   schemas:
 *     Lead:
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
 * /lead/create:
 *   post:
 *     summary: Create a new Lead
 *     tags: [Lead]
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
 * /lead/update/{id}:
 *   patch:
 *     summary: Update an existing Lead
 *     tags: [Lead]
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
 * /lead/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Lead
 *     tags: [Lead]
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
 * /lead/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Lead
 *     tags: [Lead]
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
 * /lead/get:
 *   get:
 *     summary: Get a list of Leads
 *     tags: [Lead]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lead'
 */

/**
 * @swagger
 * /lead/get/{id}:
 *   get:
 *     summary: Get a Lead by ID
 *     tags: [Lead]
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
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Not found
 */

leadRoutes.post('/create', authMiddleware, controllers.leadControllers.create);
leadRoutes.patch('/update/:id', authMiddleware, controllers.leadControllers.update);
leadRoutes.delete('/soft-delete/:id', authMiddleware, controllers.leadControllers.softDelete);
leadRoutes.delete('/delete/:id', authMiddleware, controllers.leadControllers.deleteOne);
leadRoutes.get('/get', controllers.leadControllers.get);
leadRoutes.get('/get/:id', controllers.leadControllers.getOne);

export default leadRoutes;
