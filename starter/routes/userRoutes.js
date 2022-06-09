const express = require('express');
const userController = require('../controllers/userController');
const { userAuthorization } = require('../middlewares/authorizationMidleware');

const router = express.Router();
// get all users and create a new user
router.route('/').post(userController.createUser);

//get user profile
router.route('/').get(userAuthorization, userController.getUser);

// login route
router.route('/login').post(userController.login);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
