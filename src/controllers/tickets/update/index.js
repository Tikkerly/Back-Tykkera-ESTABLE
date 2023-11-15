const Ticket = require("../../../models/Ticket");

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const userEdit = await Ticket.findByIdAndUpdate(id, { ...req.body });
    return userEdit
      ? res.status(200).json({
          message: "Ticket actualizado con éxito",
        })
      : res.status(400).json({
          message:
            "No se pudo actualizar el ticket. Intente de nuevo o contacte con un administrador.",
        });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = updateTicket;
