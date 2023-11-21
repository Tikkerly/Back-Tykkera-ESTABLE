const { hashPassword } = require("./bcrypt/hashPassword");
const { comparePassword } = require("./bcrypt/comparePassword");
const { googleVerify } = require("./googleAuth");
const { generarJWT, validateJWTEmail } = require("./jsonwebtoken");
const { existEmail, userExistById } = require("./customValidations");
const { uploadFile } = require("./uploadFile");
const {
  sendPasswordResetEmail,
  sendPasswordRegisterEmail,
} = require("./sendMail");

module.exports = {
  hashPassword,
  comparePassword,
  generarJWT,
  googleVerify,
  existEmail,
  userExistById,
  sendPasswordResetEmail,
  sendPasswordRegisterEmail,
  validateJWTEmail,
  uploadFile,
};
