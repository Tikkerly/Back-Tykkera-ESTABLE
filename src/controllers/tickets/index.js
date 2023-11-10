const deleteTicket = require("./delete/index");
const updateTicket = require("./update/index");
const registerTicket = require("./register/index");
const { getAllTickets, getTicketsClient } = require("./get/index");
module.exports = {
  deleteTicket,
  updateTicket,
  registerTicket,
  getAllTickets,
  getTicketsClient,
};
