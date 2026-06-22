import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';

const dashboardRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: API endpoints for managing Dashboard statistics
 */

/**
 * @swagger
 * /dashboard/get:
 *   get:
 *     summary: Get dashboard statistics and activities timeline
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
dashboardRoutes.get('/get', authMiddleware, controllers.dashboardControllers.get);

export default dashboardRoutes;
