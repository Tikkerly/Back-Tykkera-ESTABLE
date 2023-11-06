const { Router } = require('express');
const userRoutes = Router();
const { userControllers } = require('../../controllers/index');
const { checkJWT } = require('../../middlewares/index')
/*
userControllers = {
    loginUserController,
    registerUserController
} */


//userRoutes.use('/profileInfo',checkJWT)
//userRoutes.get('/profileInfo', userControllers.profileInfo)

userRoutes.post('/loginUser', userControllers.loginUser);
userRoutes.post('/registerUser', userControllers.registerUser);

userRoutes.use('/editUser', checkJWT)
userRoutes.put('/editUser', userControllers.editUser);

module.exports = userRoutes;