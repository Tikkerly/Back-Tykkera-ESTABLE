const deleteTicket = require("./delete/index");
const updateTicket = require("./update/index");
const registerTicket = require("./register/index");
const { getTicketsByAgent, getTicketsByUser, getTicketById } = require("./get/index");
module.exports = {
  deleteTicket,
  updateTicket,
  registerTicket,
  getTicketsByAgent,
  getTicketsByUser,
  getTicketById
};
