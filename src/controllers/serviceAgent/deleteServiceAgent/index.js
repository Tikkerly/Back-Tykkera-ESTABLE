const FinalClient = require("../../../models/FinalClient");

const deleteServiceAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const finalClient = await FinalClient.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "El cliente final ha sido borrado con éxito" });
  } catch (error) {
    return res.status(400).json({ message: "Error al borrar al cliente final." });
  }
};

module.exports = deleteServiceAgent;
