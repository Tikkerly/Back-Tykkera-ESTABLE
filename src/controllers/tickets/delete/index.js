const Ticket = require("../../../models/Ticket");

const deleteTicket = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const ticket = await Ticket.findOneAndUpdate({ _id }, { isDeleted: true });

    return ticket
      ? res.status(200).json({
          message: "La operación ha sido completada con éxito",
        })
      : res.status(400).json({
          message:
            "Error al procesar la operación. El consecutivo interno proporcionado es incorrecto.",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error al borrar el ticket",
    });
  }
};

module.exports = deleteTicket;
