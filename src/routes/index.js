const { Router } = require("express");
const router = Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const ticketRoutes = require("./ticket");
const uploadRoutes = require("./uploads");
const technicianRoutes = require("./technician");
const finalClientRoutes = require("./finalClient");
const serviceAgentRoutes = require("./serviceAgent");

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/tickets", ticketRoutes);
router.use("/technician", technicianRoutes);
router.use("/finalclient", finalClientRoutes);
router.use("/serviceagent", serviceAgentRoutes);

module.exports = router;






