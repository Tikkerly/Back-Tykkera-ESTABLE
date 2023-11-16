const { registerServiceAgent, validateRegister } = require("./registerServiceAgent");
const editServiceAgent = require("./editServiceAgent");
const getServiceAgents = require("./getServiceAgents");
const getServiceAgentByID = require("./getServiceAgentByID");
const deleteServiceAgent = require("./deleteServiceAgent");

const { forgotPassword, passwordRecovery } = require("./forgotPassword");

module.exports = {
  registerServiceAgent,
  editServiceAgent,
  getServiceAgents,
  deleteServiceAgent,
  validateRegister,
  getServiceAgentByID,
  forgotPassword,
  passwordRecovery
};
