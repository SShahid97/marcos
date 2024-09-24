const { authenticate, authorize } = require('../controller/authController');
const {createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../controller/projectController');

const router = require('express').Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:           
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - productImage
 *         - price
 *         - shortDescription
 *         - description
 *         - productUrl
 *         - category
 *         - tags
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the project
 *         title:
 *           type: string
 *           description: The title of your project
 *         productImage:
 *           type: array
 *           description: The images array of the project
 *         price:
 *           type: number
 *           description: The price of the project
 *         shortDescription:
 *           type: string
 *           description: The short description of the project
 *         description:
 *           type: string
 *           description: The description of the project
 *         productUrl:
 *           type: string
 *           description: The url of the project
 *         category:
 *           type: array
 *           description: The category array of the project
 *         tags:
 *           type: array
 *           description: The tags array of the project
 *         createdBy:
 *           type: number
 *           description: The id of the user who creates the project
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the project was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the project was updated
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         productImage: ['https://dummyImage.com']
 *         price: 50.0
 *         description: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
 *         shortDescription: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here'.
 *         productUrl: 'https://dummyImage.com'
 *         category: ['nodejs', 'backend']
 *         tags: ['database', 'mern stack']
 *         createdBy: {}
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: The projects managing API
 * /api/v1/projects:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists all the projects
 *     tags: [Project]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: true
 *         description: page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: true
 *         description: limit
 *     responses:
 *       200:
 *         description: The list of the projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Status Code.
 *                 message:
 *                   type: string
 *                   description: Success Meesage.   
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *          
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 * /api/v1/projects/{id}:
 *   get:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Get the project by id
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: The project response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: The Project was not found
 *   patch:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Update the project by the id
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated succussfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Status Code.
 *                 message:
 *                   type: string
 *                   description: Success Meesage.
 *             example:
 *               status: 200
 *               message: Project updated succussfully
 *       404:
 *         description: The project was not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete the project by id
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: Project deleted succussfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Status Code.
 *                 message:
 *                   type: string
 *                   description: Success Meesage.
 *             example:
 *               status: 200
 *               message: Project deleted succussfully
 *       404:
 *         description: The project was not found
 *       500:
 *         description: Internal Server Error
 */
router.route('/').post(authenticate, authorize('1'),createProject);
router.route('/').get(authenticate,getAllProjects);
router.route('/:id').get(authenticate,getProjectById);
router.route('/:id').patch(authenticate,updateProject);
router.route('/:id').delete(authenticate,deleteProject);
module.exports = router;