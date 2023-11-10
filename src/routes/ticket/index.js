const ticketRoutes = require("express").Router();
const { ticketControllers } = require("../../controllers/index");
const { check } = require("express-validator");
const {
  validarJWT,
  adminRole,
  fieldsValidate,
} = require("../../middlewares/index");

ticketRoutes.get("/", validarJWT, adminRole, ticketControllers.getAllTickets);
ticketRoutes.get("/:client_id", validarJWT, ticketControllers.getTicketsClient);

ticketRoutes.post(
  "/registerticket",
  validarJWT,
  [
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("client_id", "El cliente es obligatorio").not().isEmpty(),
    fieldsValidate,
  ],
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
