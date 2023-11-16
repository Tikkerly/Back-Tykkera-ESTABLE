const userControllers = require("./users");
const technicianControllers = require("./technician");
const finalClientControllers = require("./finalClient");
const serviceAgentControllers = require("./serviceAgent");
const authControllers = require("./auth");
const ticketControllers = require("./tickets");

module.exports = {
  userControllers,
  technicianControllers,
  authControllers,
  ticketControllers,
  finalClientControllers,
  serviceAgentControllers
};
