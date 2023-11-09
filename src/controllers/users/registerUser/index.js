const {
  hashPassword,
  sendPasswordRegisterEmail,
} = require("../../../helpers/index");
const User = require("../../../models/User");

const registerUser = async (req, res) => {
  try {
    const { username, password, email, rol, img } = req.body;
    const encryptedPassword = hashPassword(password);
    const user = new User({
      username,
      password: encryptedPassword,
      email,
      rol,
      img,
    });
    await user.save();
    sendPasswordRegisterEmail(email);
    return res.status(200).json({
      message:
        "El usuario ha sido registrado. ¡Ve al email con el que te registraste para validar el registro!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error al registrar el usuario." });
  }
};

module.exports = registerUser;
