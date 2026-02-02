const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth.controllers');
const {ValidateRegistration,LoginValidations} = require('../middlewares/ValidateRegister');

router.post('/register',ValidateRegistration,AuthController.RegisterUser);
router.post('/login',LoginValidations,AuthController.LoginUser);
router.post('/refresh',AuthController.Refresh);
router.post('/logout',AuthController.Logout);


module.exports = router;