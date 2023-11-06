const { Router } = require('express');
const router = Router();
const userRoutes = require('./userRoutes/index');

router.use('/',userRoutes)

module.exports = router;