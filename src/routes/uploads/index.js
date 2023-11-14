const { Router } = require("express");
const { updateUploadFile } = require("../../controllers/uploads");
//const { fieldsValidate } = require("../../middlewares/validateErrors");
const { check } = require("express-validator");
const { validarJWT, validateUploads } = require("../../middlewares");
const uploadRoutes = Router();

uploadRoutes.post(
  "/:model/:id",
  validateUploads,
  check("id", "El id debe de ser de mongo").isMongoId(),
  //   [
  //     check("email", "El correo es obligatorio").isEmail(),
  //     check("password", "La contraseña es obligatoria").not().isEmpty(),
  //     fieldsValidate,
  //   ],
  updateUploadFile
);

module.exports = uploadRoutes;
