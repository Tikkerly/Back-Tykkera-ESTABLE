const { registerFinalClient, validateRegister } = require("./registerFinalClient");
const editFinalClient = require("./editFinalClient");
const getFinalClients = require("./getFinalClients");
const getFinalClientByID = require("./getFinalClientByID");
const deleteFinalClient = require("./deleteFinalClient");

module.exports = {
  registerFinalClient,
  editFinalClient,
  getFinalClients,
  deleteFinalClient,
  validateRegister,
  getFinalClientByID,
};
