const ticketRoutes = require("express").Router();
const { ticketControllers } = require("../../controllers/index");
const { check } = require("express-validator");
const { fieldsValidate } = require("../../middlewares/index");

ticketRoutes.get("/", ticketControllers.getTickets);
ticketRoutes.post(
  "/register-ticket",
  [
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("client_id", "El cliente es obligatorio").not().isEmpty(),
    fieldsValidate,
  ],
  ticketControllers.registerTicket
);
ticketRoutes.delete(
  "/delete-ticket/:id",
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.deleteTicket
);
ticketRoutes.put(
  "/update-ticket/:id",
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.updateTicket
);

module.exports = ticketRoutes;
