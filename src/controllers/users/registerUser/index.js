const path = require("path");
const { hashPassword, sendPasswordRegisterEmail } = require("../../../helpers");
const { add, format } = require('date-fns')

const User = require("../../../models/User");

const registerUser = async (req, res) => {
  const actualDate = new Date();
  const endDate = add(actualDate, { days: 30 })
  const trialStartDate = format(actualDate, 'dd/MM/yy');
  const trialEndDate = format(endDate, 'dd/MM/yy')
  try {
    const {
      username,
      password,
      email,
      NIT,
      img,
      personType,
      phone,
      address,
    } = req.body;

    const encryptedPassword = hashPassword(password);

    const user = new User({
      username,
      password: encryptedPassword,
      personType,
      email,
      address,
      NIT,
      img,
      phone,
      trialStartDate,
      trialEndDate,
    });
    await user.save();
    sendPasswordRegisterEmail(email, user._id);
    return res.status(200).json({
      message:
        "El usuario ha sido registrado. ¡Ve al email con el que te registraste para validar el registro!",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const validateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.activeRegister = true;
    user.save();
    return res.status(200).json({ msg: "Usuario Validado con exito", user: user });
  } catch (error) {
    return res.status(400).json({ msg: "Error al validar registro" });
  }
};

module.exports = { registerUser, validateRegister };
