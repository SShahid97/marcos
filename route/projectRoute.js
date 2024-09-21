const { authenticate, authorize } = require('../controller/authController');
const {createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../controller/projectController');

const router = require('express').Router();

router.route('/').post(authenticate, authorize('1'),createProject);
router.route('/').get(authenticate,getAllProjects);
router.route('/:id').get(authenticate,getProjectById);
router.route('/:id').patch(authenticate,updateProject);
router.route('/:id').delete(authenticate,deleteProject);
module.exports = router;