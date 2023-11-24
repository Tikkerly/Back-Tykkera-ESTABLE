const User = require("../../models/User");

const existEmail = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`El Correo ${email} ya existe`);
  }
};

const existDocument = async (document = "") => {
  const user = await User.findOne({ document });
  if (user) {
    throw new Error(`El documento ${document} ya existe`);
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
  existDocument,
};
