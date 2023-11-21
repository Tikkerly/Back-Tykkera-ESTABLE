const { registerTechnician, validateRegister } = require("./registerTechnicians");
const editTechnician = require("./editTechnician");
const getTechnicians = require("./getTechnicians");
const getTechnicianByID = require("./getTechnicianByID");
const deleteTechnician = require("./deleteTechnician");

module.exports = {
  registerTechnician,
  editTechnician,
  getTechnicians,
  deleteTechnician,
  validateRegister,
  getTechnicianByID,
};
