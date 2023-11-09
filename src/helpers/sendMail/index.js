const nodemailer = require("nodemailer");

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
  const mailOptions = {
    from: "Recuperar Contraseña<tikkerly@gmail.com>",
    to: email,
    subject: "Restablecer contraseña",
    text: `Por favor, visita el siguiente enlace para restablecer tu contraseña: http://localhost:5173/user/passwordrecovery/${token}`,
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
const sendPasswordRegisterEmail = (email, token) => {
  const mailOptions = {
    from: "Confirmar Registro<tikkerly@gmail.com>",
    to: email,
    subject: "Confirmar registro",
    text: `Por favor, visita el siguiente enlace para activar tu usuario: http://localhost:5173/user/activeuser`,
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
