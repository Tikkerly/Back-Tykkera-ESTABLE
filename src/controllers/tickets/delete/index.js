const Ticket = require("../../../models/Ticket");

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTicket = await Ticket.findByIdAndUpdate(id, { status: false });

    return updateTicket
      ? res.status(200).json("El ticket ha sido eliminado con éxito")
      : res.status(400).json({
          message:
            "Error al eliminar el ticket. Intente otra vez o contacte con un administrador",
        });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = deleteTicket;
