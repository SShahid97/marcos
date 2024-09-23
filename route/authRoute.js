const { signup, login } = require('../controller/authController');

const router = require('express').Router();

router.route('/signup').post(signup);
router.route('/signin').post(login);

module.exports = router;