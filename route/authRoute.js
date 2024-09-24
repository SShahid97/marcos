const { signup, login } = require('../controller/authController');

const router = require('express').Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         userType:
 *           type: string
 *           description: The type of user
 *         firstName:
 *           type: string
 *           description: first name of the user
 *         lastName:
 *           type: string
 *           description: last name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of the user
 *         confirmPassword:
 *           type: string
 *           description: password of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user signed up
 *       example:
 *         userType: "1"
 *         firstName: "Musa"
 *         lastName: "Bhat"
 *         email: "musa101@yopmail.com"
 *         password: "String@123"
 *         confirmPassword: "String@123"   
*/

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication APIs
 * /api/v1/auth/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type:number
 *                 message:
 *                   type:string
 *                 data:
 *                   type: object
 *             example:
 *               status: 201
 *               message: User created successfully
 *               data:
 *                 id: 1
 *                 userType: "1"
 *                 firstName: "Musa"
 *                 lastName: "Bhat"
 *                 email: "abc@gmail.com"
 *                 updatedAt: "2024-09-23T06:38:36.264Z"
 *                 createdAt: "2024-09-23T06:38:36.264Z"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI3MDczNTE2LCJleHAiOjE3MzQ4NDk1MTZ9.OBMyfYOegtEqY1wmTPuHfIWnBlZaxBPShdOZnEs_zJE"
 *       500:
 *         description: Some server error
 * 
 * /api/v1/auth/signin:
 *   post:
 *     summary: Signin a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email of the user
 *               password:
 *                 type: string
 *                 description: password of the user
 *           example:
 *             email: musa101@yopmail.com
 *             password: "String@123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type:number
 *                 message:
 *                   type:string
 *                 data:
 *                   type: object
 *             example:
 *               status: 200
 *               message: User signed in successfully
 *               data:
 *                 id: 1
 *                 userType: "1"
 *                 firstName: "Musa"
 *                 lastName: "Bhat"
 *                 email: "abc@gmail.com"
 *                 updatedAt: "2024-09-23T06:38:36.264Z"
 *                 createdAt: "2024-09-23T06:38:36.264Z"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI3MDczNTE2LCJleHAiOjE3MzQ4NDk1MTZ9.OBMyfYOegtEqY1wmTPuHfIWnBlZaxBPShdOZnEs_zJE"
 *       500:
 *         description: Some server error
 */
router.route('/signup').post(signup);
router.route('/signin').post(login);

module.exports = router;