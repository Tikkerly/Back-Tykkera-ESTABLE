const User = require("../../models/User");
const existEmail = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} already exists`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findBYId(id);
  if (!userExist) {
    throw new Error(`The user with ${id} does not exist`);
  }
};

module.exports = {
  existEmail,
  userExistById,
};
