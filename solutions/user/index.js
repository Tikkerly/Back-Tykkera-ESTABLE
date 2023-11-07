
const nodemailer = require('nodemailer');


// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tikkerly@gmail.com',
    pass: 'tikkerlypf123'
  }
});

// Ruta para enviar el correo de bienvenida
app.post('/bienvenida', (req, res) => {
  const nombre = req.body.nombre;

  // Cuerpo del correo de bienvenida en formato HTML
  const correoBienvenida = `
    <html>
      <head>
        <title>Correo de bienvenida</title>
      </head>
      <body>
        <h1>¡Bienvenido!</h1>
        <p>Hola ${nombre}, gracias por registrarte en nuestro sitio web.</p>
        <p>Esperamos que disfrutes tu experiencia.</p>
      </body>
    </html>
  `;

  // Configuración del correo
  const mailOptions = {
    from: 'tikkerly@gmail.com',
    to: 'joelopezdj@gmail,com',
    subject: '¡Bienvenido!',
    html: correoBienvenida
  };

  // Envío del correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).json({ message: 'Correo de bienvenida enviado correctamente' });
    }
  });
});
