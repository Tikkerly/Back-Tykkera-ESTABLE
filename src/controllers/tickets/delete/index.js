const Ticket = require("../../../models/Ticket");

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(id, { status: req.body.status });
    const message = req.body.status ? " ha sido restaurado con exito" : " ha sido borrado con exito"
    return res
    .status(200)
    .json({ message:"El ticket" + message }) 
  } catch ({ message }) {
    return res.status(400).json({ message: "Error al eliminar el ticket." });
  }
};

module.exports = deleteTicket;
