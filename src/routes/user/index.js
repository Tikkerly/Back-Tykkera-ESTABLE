const { Router } = require("express");
const userRoutes = Router();
const { userControllers } = require("../../controllers/index");
const {
  validarJWT,
  adminRole,
  fieldsValidate,
} = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
} = require("../../helpers/customValidations/index");

userRoutes.get("/", validarJWT, adminRole, userControllers.getUsers);

userRoutes.post(
  "/registeruser",
  [
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    check("email").custom(existEmail),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  userControllers.registerUser
);

// userRoutes.use('/editUser', checkJWT)
userRoutes.put(
  "/edituser/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  userControllers.editUser
);
userRoutes.delete(
  "/deleteuser/:id",
  validarJWT,
  adminRole,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  userControllers.deleteUser
);

module.exports = userRoutes;
