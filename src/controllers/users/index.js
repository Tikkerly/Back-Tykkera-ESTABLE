const registerUser = require("./registerUser");
const editUser = require("./editUser");
const getUsers = require("./getUsers");
const deleteUser = require("./deleteUser");
const { forgotPassword, passwordRecovery } = require("./forgotPassword");

module.exports = {
  registerUser,
  editUser,
  getUsers,
  deleteUser,
  forgotPassword,
  passwordRecovery,
};
