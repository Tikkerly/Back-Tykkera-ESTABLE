const adminControllers = require('./adminControllers/index');
/*
adminControllers = {
    banController,
    orderController
}
*/
const userControllers = require('./userControllers/index');
/*
userControllers = {
    loginUserController,
    registerUserController
} */

module.exports = {
    adminControllers,
    userControllers
}