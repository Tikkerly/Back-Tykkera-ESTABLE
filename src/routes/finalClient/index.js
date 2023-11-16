const { Router } = require("express");
const finalClientRoutes = Router();
const { finalClientControllers } = require("../../controllers");
const {
  validarJWT,
  fieldsValidate,
} = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
} = require("../../helpers/customValidations/index");

finalClientRoutes.get("/", validarJWT, finalClientControllers.getFinalClients);

finalClientRoutes.post(
  "/registerfinalclient",
  [
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    fieldsValidate,
  ],
  finalClientControllers.registerFinalClient
);
finalClientRoutes.post(
  "/validateregister/:id",
  // [
  //   check("email", "EL email es obligatorio").not().isEmpty(),
  //   check("email").custom(existEmail),
  //   fieldsValidate,
  // ],
  finalClientControllers.validateRegister
);

finalClientRoutes.put(
  "/editfinalclient/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  finalClientControllers.editFinalClient
);

finalClientRoutes.get(
  "/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  finalClientControllers.getFinalClientByID
);

finalClientRoutes.delete(
  "/deletefinalclient/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  finalClientControllers.deleteFinalClient
);


module.exports = finalClientRoutes;
