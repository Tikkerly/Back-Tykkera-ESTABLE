// const checkJWT = require('./auth/index')
const { fieldsValidate } = require("./validateErrors/index");
const { validarJWT } = require("./validateTokens/index");
module.exports = {
  fieldsValidate,
  validarJWT,
};
