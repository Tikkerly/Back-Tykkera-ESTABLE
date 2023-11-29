const User = require("../../../models/User");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (id === "undefined") {
    return res.status(201).json({ message: "No autorizado" });
  }
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUser;
