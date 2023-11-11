const User = require("../../../models/User");

const getUsers = async (req, res) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true, activeRegister: true };
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);
    return res.status(200).json({ total, users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUsers;
