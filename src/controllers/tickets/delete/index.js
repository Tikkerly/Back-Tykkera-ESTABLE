const Ticket = require("../../../models/Ticket");

const deleteTicket = async (req, res) => {
  try {
    const { code } = req.params;
    const ticket = await Ticket.findOneAndUpdate({ code }, { isDeleted: true });

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
