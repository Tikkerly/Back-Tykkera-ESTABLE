const Ticket = require("../../../models/Ticket");
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

    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ _id: id }),
      Ticket.find({ _id: id }),
    ]);

    return res.status(200).json({ total, tickets });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllTickets,
  getTicketByUser,
};
