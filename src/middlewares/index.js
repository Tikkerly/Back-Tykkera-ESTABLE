// const checkJWT = require('./auth/index')
const { fieldsValidate } = require("./validateErrors/index");
const { validarJWT, validarJWTEmail } = require("./validateTokens/index");
const { adminRole } = require("./protectAdmin/index");
module.exports = {
  fieldsValidate,
  validarJWT,
  adminRole,
  validarJWTEmail,
};
