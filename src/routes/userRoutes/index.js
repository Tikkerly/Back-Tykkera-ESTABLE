const { Router } = require("express");
const userRoutes = Router();
const { userControllers } = require("../../controllers/index");
const {  validarJWT, adminRole, fieldsValidate } = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
} = require("../../helpers/customValidations/index");
/*
userControllers = {
    loginUserController,
    registerUserController
} */

//userRoutes.use('/profileInfo',checkJWT)
//userRoutes.get('/profileInfo', userControllers.profileInfo)

userRoutes.get("/", validarJWT, adminRole, userControllers.getUsers );

userRoutes.post("/loginUser", userControllers.loginUser);

userRoutes.post(
  "/registerUser",
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
  "/editUser/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate, 
  ],
  userControllers.editUser
);
userRoutes.delete(
  "/deleteUser",
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
