const deleteTicket = require("./delete/index");
const updateTicket = require("./update/index");
const registerTicket = require("./register/index");
const { accumulatedUtility, utilityMonthGraph, statusGraph, getTicketsByAgent, getTicketsByUser, getTicketById, getTicketsByTechnician } = require("./get/index");
module.exports = {
  deleteTicket,
  updateTicket,
  registerTicket,
  getTicketsByAgent,
  getTicketsByUser,
  getTicketById,
  getTicketsByTechnician,
  statusGraph,
  utilityMonthGraph,
  accumulatedUtility
};
