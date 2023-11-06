const { Router } = require('express');
const router = Router();
const userRoutes = require('./userRoutes/index');
const adminRoutes = require('./adminRoutes/index')

router.use('/',userRoutes)
router.use('/',adminRoutes)

module.exports = router;