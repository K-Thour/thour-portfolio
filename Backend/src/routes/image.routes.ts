import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';

const imageRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: API endpoints for managing Image uploads
 */

/**
 * @swagger
 * /image/upload:
 *   post:
 *     summary: Upload an image to Cloudinary (or fallback base64 string)
 *     tags: [Image]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 data URL string of the image
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized
 */
imageRoutes.post('/upload', authMiddleware, controllers.imageControllers.upload);

export default imageRoutes;
