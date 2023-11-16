const { Router } = require("express");
const serviceAgentRoutes = Router();
const { serviceAgentControllers } = require("../../controllers");
const {
  validarJWT,
  fieldsValidate,
} = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
} = require("../../helpers/customValidations/index");

serviceAgentRoutes.get("/", validarJWT, serviceAgentControllers.getServiceAgents);

serviceAgentRoutes.post(
  "/registerserviceagent",
  [
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  serviceAgentControllers.registerServiceAgent
);
serviceAgentRoutes.post(
  "/validateregister/:id",
  // [
  //   check("email", "EL email es obligatorio").not().isEmpty(),
  //   check("email").custom(existEmail),
  //   fieldsValidate,
  // ],
  serviceAgentControllers.validateRegister
);

serviceAgentRoutes.put(
  "/editserviceagent/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  serviceAgentControllers.editServiceAgent
);

serviceAgentRoutes.get(
  "/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  serviceAgentControllers.getServiceAgentByID
);

serviceAgentRoutes.delete(
  "/deleteserviceagent/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  serviceAgentControllers.deleteServiceAgent
);

serviceAgentRoutes.post(
  "/forgotpassword",
  [check("email", "EL email es obligatorio").not().isEmpty(), fieldsValidate],
  serviceAgentControllers.forgotPassword
);
serviceAgentRoutes.post("/passwordrecovery", serviceAgentControllers.passwordRecovery);

module.exports = serviceAgentRoutes;
