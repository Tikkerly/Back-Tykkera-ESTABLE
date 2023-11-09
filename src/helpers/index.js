const { hashPassword } = require("./bcrypt/hashPassword");
const { comparePassword } = require("./bcrypt/comparePassword");
const { generarJWT, validateJWTEmail } = require("./jsonwebtoken");
const { existEmail, userExistById } = require("./customValidations");
const {
  sendPasswordResetEmail,
  sendPasswordRegisterEmail,
} = require("./sendMail");

module.exports = {
  hashPassword,
  comparePassword,
  generarJWT,
  existEmail,
  userExistById,
  sendPasswordResetEmail,
  sendPasswordRegisterEmail,
  validateJWTEmail,
};
