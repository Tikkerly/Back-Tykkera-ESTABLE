const Ticket = require("../../../models/Ticket");

const registerTicket = async (req, res) => {
  try {
    const { description, client_id } = req.body;
    if (description && client_id) {
      const ticket = new Ticket({
        ...req.body,
      });

      await ticket.save();
      return res.status(201).json({
        message: "Ticket registrado con éxito",
      });
    }
    return res.status(400).json({
      message: "Falta información obligatoria",
    });
  } catch ({ message }) {
    return res.status(500).json(message);
  }
};

module.exports = registerTicket;
