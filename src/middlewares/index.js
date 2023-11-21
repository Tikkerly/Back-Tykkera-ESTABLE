// const checkJWT = require('./auth/index')
const { fieldsValidate } = require("./validateErrors");
const { validateUploads } = require("./validateUploads");
const { validarJWT, validarJWTEmail } = require("./validateTokens");
module.exports = {
  fieldsValidate,
  validarJWT,
  validarJWTEmail,
  validateUploads,
};
