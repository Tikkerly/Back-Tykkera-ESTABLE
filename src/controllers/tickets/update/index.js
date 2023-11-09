const Ticket = require("../../../models/Ticket");

//* Se habla de solo actualizar el ticket
//? Dos maneras: El técnico solo puede cambiar el estado del ticket al que fue asignado

// const updateTicket = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { technician_id, status } = req.body;
//     const ticket = await Ticket.findOne({ od });
//     if (ticket) {
//       if (ticket.technician_id === technician_id) {
//         ticket.status = status;
//         await ticket.save();
//         return res.status(200).json({
//           message: "El estado del ticket ha sido actualizado con éxito",
//         });
//       }
//       return res.status(401).json({
//         message:
//           "Error al editar el ticket. No cuentas con los permisos necesarios para editar el ticket de otro técnico",
//       });
//     }
//     return res.status(404).json({
//       message: "Ticket no encontrado",
//     });
//   } catch ({ message }) {
//     return res.status(500).json(message);
//   }
// };

//? La otra manera es en donde no se verifica quien cambiara el estatus del ticket
//? Este método puede ser usado tanto por el técnico como por el agente de servicio

// ! Atención: Aquí abro debate con todos para ver cual se considera mejor o ambos
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ticket = await Ticket.findOne({ id });
    if (ticket) {
      ticket.status = status;
      await ticket.save();
      return res.status(200).json({
        message: "El estado del ticket ha sido actualizado con éxito",
      });
    }
    return res.status(404).json({
      message: "Ticket no encontrado",
    });
  } catch ({ message }) {}
};

module.exports = updateTicket;
