const { Router } = require("express");
const router = Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const ticketRoutes = require("./ticket");
const uploadRoutes = require("./uploads");

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/tickets", ticketRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
