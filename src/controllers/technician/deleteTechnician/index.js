const Technician = require("../../../models/Technician");

const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    
    const technician = await Technician.findByIdAndUpdate(id, {
      status: req.body.status,
    });
    const message = req.body.status ? " ha sido desbloqueado con exito" : " ha sido bloqueado con exito"
    return res
      .status(200)
      .json({ message: "El técnico" + message });
  } catch (error) {
    return res.status(400).json({ message: "Error en la operación" });
  }
};

module.exports = deleteTechnician;
