const User = require("../../models/User");
const existEmail = async (mail = "") => {
  const user = await User.findOne({ mail });

  if (user) {
    throw new Error(`El Correo ${email} ya existe`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

module.exports = {
  existEmail,
  userExistById,
};
