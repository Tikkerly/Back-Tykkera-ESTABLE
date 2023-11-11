const Ticket = require("../../../models/Ticket");
const User = require("../../../models/User");
//* Se habla de solo actualizar el ticket
//? Dos maneras: El técnico solo puede cambiar el estado del ticket al que fue asignado

const updateTicket = async (req, res) => {
  try {
    // ID DEL TICKET A EDITAR
    const { id: _id } = req.params;

    // Datos recibidos
    // id hace referencia al id del usuario
    const { user_id, ...rest } = req.body;
    const user = await User.findOne({ _id: user_id });

    if (user) {
      const ticket = await Ticket.findOne({ _id });
      if (ticket) {
        const userRol = user.rol;

        if (userRol === "TECNICO") {
          if (ticket.technician_id !== user_id) {
            return res.status(401).json({
              message:
                "Error, no cuentas con el permiso para realizar la modificación de este ticket.",
            });
          }
        }

        if (userRol === "CLIENTE") {
          if (ticket.client_id !== user_id) {
            return res.status(401).json({
              message:
                "Error, no cuentas con el permiso para realizar la modificación de este ticket.",
            });
          }
        }

        await Ticket.updateOne({ _id }, { $set: rest });
      }
      return res.status(401).json({
        message: "Error al editar el ticket. Ticket no encontrado",
      });
    }

    return res.status(401).json({
      message: "Error al editar el ticket. Usuario inválido",
    });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = updateTicket;
