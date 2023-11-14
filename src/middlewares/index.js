// const checkJWT = require('./auth/index')
const { fieldsValidate } = require("./validateErrors");
const { validateUploads } = require("./validateUploads");
const { validarJWT, validarJWTEmail } = require("./validateTokens");
const { adminRole } = require("./protectAdmin");
module.exports = {
  fieldsValidate,
  validarJWT,
  adminRole,
  validarJWTEmail,
  validateUploads,
};
