const { Router } = require('express');
const adminRoutes = Router();
const { adminControllers } = require('../../controllers/index')

adminRoutes.get('/orders', adminControllers.orderController);
adminRoutes.post('/ban', adminControllers.banController);

module.exports = adminRoutes