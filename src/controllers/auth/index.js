const { response } = require("express");
const bcryptjs = require("bcrypt");
const User = require("../../models/User");
const { generarJWT, googleVerify } = require("../../helpers");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // SI el usuario está activo
    if (!user.status || !user.activeRegister) {
      return res.status(400).json({
        msg: "Usuario no activado / consulte el administrador",
      });
    }

    if (!user.activeRegister) {
      return res.status(400).json({
        msg: "Registro: Confirme su registro",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let user = await User.findOne({ correo });

    if (!user) {
      // Tengo que crearlo
      const data = {
        username: nombre,
        email: correo,
        password: ":P",
        img: img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario en DB
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

const revalidateToken = async (req, res) => {
  const { id } = req.body;
  try {
    const newToken = await generarJWT(id);
    res.status(200).json(newToken);
  } catch (error) {
    return res.status(400).json({ msg: "Id no valido" });
  }
};

module.exports = {
  login,
  googleSignin,
  revalidateToken,
};
