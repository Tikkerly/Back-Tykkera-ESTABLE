const User = require("../../../models/User");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: req.body.status });
    const message = req.body.status ? " ha sido desbloqueado con exito" : " ha sido bloqueado con exito"
    return res
      .status(200)
      .json({ message: user.username + message });
  } catch (error) {
    return res.status(400).json({ message: "Error en la operación" });
  }
};

module.exports = deleteUser;
