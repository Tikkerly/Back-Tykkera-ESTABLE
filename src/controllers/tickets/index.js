const deleteTicket = require("./delete/index");
const updateTicket = require("./update/index");
const registerTicket = require("./register/index");
const { getAllTickets, getTicketByUser } = require("./get/index");
module.exports = {
  deleteTicket,
  updateTicket,
  registerTicket,
  getAllTickets,
  getTicketByUser,
};
