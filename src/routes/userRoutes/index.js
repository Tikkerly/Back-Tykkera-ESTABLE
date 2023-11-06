const { Router } = require('express');
const userRoutes = Router();
const { userControllers } = require('../../controllers/index');
/*
userControllers = {
    loginUserController,
    registerUserController
} */


userRoutes.post('/loginUser', userControllers.loginUserController);
userRoutes.post('/registerUser', userControllers.registerUserController);

module.exports = userRoutes;