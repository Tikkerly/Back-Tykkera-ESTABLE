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

const getTicketsClient = async (req, res) => {
  try {
    const { client_id } = req.params;

    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ client_id }),
      Ticket.find({ client_id }),
    ]);

    return res.status(200).json({ total, tickets });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllTickets,
  getTicketsClient,
};
