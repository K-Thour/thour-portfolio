import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const portfolioRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: API endpoints for managing Portfolios
 *
 * components:
 *   schemas:
 *     Portfolio:
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
 * /portfolio/create:
 *   post:
 *     summary: Create a new Portfolio
 *     tags: [Portfolio]
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
 * /portfolio/update/{id}:
 *   patch:
 *     summary: Update an existing Portfolio
 *     tags: [Portfolio]
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
 * /portfolio/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Portfolio
 *     tags: [Portfolio]
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
 * /portfolio/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Portfolio
 *     tags: [Portfolio]
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
 * /portfolio/get:
 *   get:
 *     summary: Get a list of Portfolios
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Portfolio'
 */

/**
 * @swagger
 * /portfolio/get/{id}:
 *   get:
 *     summary: Get a Portfolio by ID
 *     tags: [Portfolio]
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
 *               $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: Not found
 */

portfolioRoutes.post('/create', authMiddleware, controllers.portfolioControllers.create);
portfolioRoutes.patch('/update/:id', authMiddleware, controllers.portfolioControllers.update);
portfolioRoutes.delete(
  '/soft-delete/:id',
  authMiddleware,
  controllers.portfolioControllers.softDelete,
);
portfolioRoutes.delete('/delete/:id', authMiddleware, controllers.portfolioControllers.deleteOne);
portfolioRoutes.get('/get', controllers.portfolioControllers.get);
portfolioRoutes.get('/get/:id', controllers.portfolioControllers.getOne);

export default portfolioRoutes;
