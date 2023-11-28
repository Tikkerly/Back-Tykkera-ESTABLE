const User = require("../../../models/User");

const getAllUsers = async (req, res) => {
  try {
    const [total, users] = await Promise.all([
      User.countDocuments(),
      User.find({ rol:"Client" })
    ]);
    return res.status(200).json({ total, users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllUsers;
