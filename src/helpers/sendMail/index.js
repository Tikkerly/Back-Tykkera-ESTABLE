const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "tikkerly@gmail.com",
    pass: "ljaj nuqn egfz lfdu",
  },
});

const sendPasswordResetEmail = (email, token) => {
  const pathname = path.join(
    __dirname,
    "../../htmlResponses/forgotPassword.html"
  );
  const htmlReset = fs
    .readFileSync(pathname)
    .toString()
    .replace("${dynamicLink}", `${token}`);
  const mailOptions = {
    from: "Recuperar Contraseña<tikkerly@gmail.com>",
    to: email,
    subject: "Restablecer contraseña",
    html: htmlReset,
  };
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error al enviar el correo" });
    } else {
      console.log("Correo enviado: " + info.response);
      res.status(200).json({ message: "Correo enviado correctamente" });
    }
  });
};

const sendPasswordRegisterEmail = (email, id) => {
  const pathname = path.join(
    __dirname,
    "../../htmlResponses/registerValidation.html"
  );
  const htmlRegister = fs
    .readFileSync(pathname)
    .toString()
    .replace("${dynamicLink}", `${id}`);
  const mailOptions = {
    from: "Confirmar Registro <tikkerly@gmail.com>",
    to: email,
    subject: "Confirmar registro",
    html: htmlRegister,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error al enviar el correo" });
    } else {
      console.log("Correo enviado: " + info.response);
      res
        .status(200)
        .json({ message: "Correo de bienvenida enviado correctamente" });
    }
  });
};

module.exports = { sendPasswordResetEmail, sendPasswordRegisterEmail };
