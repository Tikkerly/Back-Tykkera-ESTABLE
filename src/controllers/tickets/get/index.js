const Ticket = require("../../../models/Ticket");
const User = require("../../../models/User");
const getAllTickets = async (req, res) => {
  try {
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({}),
      Ticket.find({}),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

// Usuario y tenico pueden listar sus tickets
const getTicketByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      const { rol } = user;
      if (rol === "TECNICO") {
        const [total, tickets] = await Promise.all([
          Ticket.countDocuments({ technician_id: id }),
          Ticket.find({ technician_id: id }),
        ]);

        return res.status(200).json({ total, tickets });
      }

      if (rol === "CLIENTE") {
        const [total, tickets] = await Promise.all([
          Ticket.countDocuments({ client_id: id }),
          Ticket.find({ client_id: id }),
        ]);

        return res.status(200).json({ total, tickets });
      }
    }

    return res.status(404).json({
      message: "Usuario no válido",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllTickets,
  getTicketByUser,
};
