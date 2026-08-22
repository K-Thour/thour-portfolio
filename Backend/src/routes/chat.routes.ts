import express from 'express';
import validate from '../middlewares/validate.middleware';
import { chatMessageSchema } from '../validations/chat.validations';
import controllers from '../controllers';

const chatRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: AI Assistant conversation endpoint
 */

/**
 * @swagger
 * /chat/message:
 *   post:
 *     summary: Send message to AI portfolio assistant
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "What are your top technical skills?"
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, model, assistant]
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Message processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     reply:
 *                       type: string
 *                     source:
 *                       type: string
 */
chatRoutes.post('/message', validate(chatMessageSchema), controllers.chatControllers.sendMessage);

// Also accept root POST for ease of consumption
chatRoutes.post('/', validate(chatMessageSchema), controllers.chatControllers.sendMessage);

export default chatRoutes;
