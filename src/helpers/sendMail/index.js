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

const sendPasswordResetEmail = (email, id) => {
  const htmlReset = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        p {
            margin-bottom: 10px;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <p>Por favor, visita el siguiente enlace para restablecer tu contraseña:</p>
    <p><a href="http://localhost:3001/user/passwordrecovery/${id}">Restablecer Contraseña</a></p>
    <img src="https://res.cloudinary.com/drteukykt/image/upload/v1699535975/ge2dbgr8lrvsdjeykyus.png" alt="Logo" width="200">
</body>
</html>
`;
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
  const htmlRegister = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        p {
            margin-bottom: 10px;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <p>Por favor, visita el siguiente enlace para confirmar tu registro en nuestra plataforma:</p>
    <p><a href="http://localhost:3000/useractivator/${id}">Confirmar el registro</a></p>
    <img src="https://res.cloudinary.com/drteukykt/image/upload/v1699535975/ge2dbgr8lrvsdjeykyus.png" alt="Logo" width="200">
</body>
</html>
`;
  const mailOptions = {
    from: "Confirmar Registro<tikkerly@gmail.com>",
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
