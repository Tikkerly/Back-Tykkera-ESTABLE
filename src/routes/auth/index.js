const { Router } = require("express");
const {
  login,
  googleSignin,
  revalidateToken,
} = require("../../controllers/auth");
const { fieldsValidate } = require("../../middlewares/validateErrors");
const { check } = require("express-validator");
const { validarJWT } = require("../../middlewares");
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
    check("credential", "El id_token es necesario").not().isEmpty(),
    fieldsValidate,
  ],
  googleSignin
);

authRoutes.post("/renew", validarJWT, revalidateToken);

module.exports = authRoutes;
