const FinalClient = require("../../../models/FinalClient");

const deleteFinalClient = async (req, res) => {
  try {
    const { id } = req.params;

    const finalClient = await FinalClient.findByIdAndUpdate(id, {
      status: req.body.status,
    });
    const message = req.body.status ? " ha sido desbloqueado con exito" : " ha sido bloqueado con exito"
    return res
      .status(200)
      .json({
        message: "El cliente final" + message,
        finalClient,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error en la operación" });
  }
};

module.exports = deleteFinalClient;
