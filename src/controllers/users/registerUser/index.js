const path = require("path");
const {
  hashPassword,
  sendPasswordRegisterEmail,
  uploadFile,
} = require("../../../helpers");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drteukykt",
  api_key: "341428778955149",
  api_secret: "XnHkABuc9YoiNtTswQO4qddPB10",
});

const User = require("../../../models/User");

const registerUser = async (req, res) => {
  try {
    const { username, password, email, rol, img, clientId, personType, phone } =
      req.body;
    const encryptedPassword = hashPassword(password);
    const name = await uploadFile(req.files, undefined, "imgs");
    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
      name
    );
    const { secure_url } = await cloudinary.uploader.upload(
      rutaCarpetaUploads,
      {
        folder: `imgs/${username}`,
      },
      (result, error) => {
        console.log(error);
      }
    );
    const user = new User({
      username,
      password: encryptedPassword,
      personType,
      email,
      rol,
      img: secure_url,
      clientId,
      phone,
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
    console.log(id);
    const user = await User.findById(id);
    user.activeRegister = true;
    user.save();
    return res
      .status(200)
      .json({ msg: "Usuario Validado con exito", user: user });
  } catch (error) {
    return res.status(400).json({ msg: "Error al validar registro" });
  }
};

module.exports = { registerUser, validateRegister };
