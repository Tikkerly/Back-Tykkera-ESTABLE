const ticketRoutes = require("express").Router();
const { ticketControllers } = require("../../controllers/index");
const { check } = require("express-validator");
const { validarJWT, fieldsValidate } = require("../../middlewares/index");

ticketRoutes.get("/", validarJWT, ticketControllers.getAllTickets);
ticketRoutes.get("/:id", validarJWT, ticketControllers.getTicketByUser);

ticketRoutes.post(
  "/registerticket",
  validarJWT,
  ticketControllers.registerTicket
);

ticketRoutes.delete(
  "/deleteticket/:id",
  validarJWT,
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.deleteTicket
);
ticketRoutes.put(
  "/updateticket/:id",
  validarJWT,
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.updateTicket
);

module.exports = ticketRoutes;
