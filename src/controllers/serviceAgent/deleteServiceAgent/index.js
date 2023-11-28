const ServiceAgent = require("../../../models/ServiceAgent");

const deleteServiceAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceAgent = await ServiceAgent.findByIdAndUpdate(id, {
      status: req.body.status,
    });
    const message = req.body.status ? " ha sido desbloqueado con exito" : " ha sido bloqueado con exito"
    return res
      .status(200)
      .json({
        message: "El agente de servicio" + message,
        serviceAgent,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error en la operación" });
  }
};

module.exports = deleteServiceAgent;
