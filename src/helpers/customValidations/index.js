const User = require("../../models/User");
const existEmail = async (mail = "") => {
  const user = await User.findOne({ mail });

  if (user) {
    throw new Error(`The email ${email} already exists`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`The user with ${id} does not exist`);
  }
};

module.exports = {
  existEmail,
  userExistById,
};
