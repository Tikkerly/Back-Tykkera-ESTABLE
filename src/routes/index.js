const { Router } = require("express");
const router = Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const ticketRoutes = require("./ticket");

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/tickets", ticketRoutes);

module.exports = router;






