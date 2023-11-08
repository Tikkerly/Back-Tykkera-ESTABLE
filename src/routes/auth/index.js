const { Router } = require("express");
const { login, googleSignin } = require("../../controllers/auth");
const { fieldsValidate } = require("../../middlewares/validateErrors");
const { check } = require("express-validator");
const authRoutes = Router();

authRoutes.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  login
);

authRoutes.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    fieldsValidate,
  ],
  googleSignin
);

module.exports = authRoutes;
