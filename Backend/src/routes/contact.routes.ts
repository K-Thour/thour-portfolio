import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middlewares/auth.middleware';
const contactRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API endpoints for managing Contacts
 *
 * components:
 *   schemas:
 *     Contact:
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
 * /contact/create:
 *   post:
 *     summary: Create a new Contact
 *     tags: [Contact]
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
 * /contact/update/{id}:
 *   patch:
 *     summary: Update an existing Contact
 *     tags: [Contact]
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
 * /contact/soft-delete/{id}:
 *   delete:
 *     summary: Soft delete a Contact
 *     tags: [Contact]
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
 * /contact/delete/{id}:
 *   delete:
 *     summary: Permanently delete a Contact
 *     tags: [Contact]
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
 * /contact/get:
 *   get:
 *     summary: Get a list of Contacts
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */

/**
 * @swagger
 * /contact/get/{id}:
 *   get:
 *     summary: Get a Contact by ID
 *     tags: [Contact]
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
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Not found
 */

contactRoutes.post('/create', authMiddleware, controllers.contactControllers.create);
contactRoutes.patch('/update/:id', authMiddleware, controllers.contactControllers.update);
contactRoutes.delete('/soft-delete/:id', authMiddleware, controllers.contactControllers.softDelete);
contactRoutes.delete('/delete/:id', authMiddleware, controllers.contactControllers.deleteOne);
contactRoutes.get('/get', controllers.contactControllers.get);
contactRoutes.get('/get/:id', controllers.contactControllers.getOne);

export default contactRoutes;
