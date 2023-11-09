const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateJWTEmail = async (token) => {
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    // leer el usuario que corresponde al uid
    const user = await User.findById(uid);
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generarJWT,
  validateJWTEmail,
};
