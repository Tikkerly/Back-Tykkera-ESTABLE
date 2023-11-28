const { registerUser, validateRegister } = require("./registerUser");
const editUser = require("./editUser");
const getUsers = require("./getUsers");
const getUser = require("./getUser");
const deleteUser = require("./deleteUser");
const { forgotPassword, passwordRecovery } = require("./forgotPassword");
const getAllUsers = require("./getAllUsers")

module.exports = {
  getAllUsers,
  registerUser,
  editUser,
  getUsers,
  deleteUser,
  forgotPassword,
  passwordRecovery,
  validateRegister,
  getUser,
};
