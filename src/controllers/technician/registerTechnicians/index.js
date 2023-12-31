const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../../../helpers");

const Technician = require("../../../models/Technician");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const registerTechnician = async (req, res) => {
  try {
    const {
      username,
      email,
      document,
      documentType,
      img,
      phone,
      address,
      paymentMethods,
      accountNumber,
      company_id,
      serviceClient_id,
      serviceTypes,
    } = req.body;

    // const fileName = await uploadFile(req.files, undefined, "imgs");

    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs"
      // fileName
    );
    // const { secure_url } = await cloudinary.uploader.upload(
    //   rutaCarpetaUploads,
    //   {
    //     folder: `imgs/${name}`,
    //   },
    //   (result, error) => {
    //     console.log(error);
    //   }
    // );
    const technician = new Technician({
      username,
      email,
      document,
      documentType,
      // img: secure_url,
      address,
      phone,
      paymentMethods,
      accountNumber,
      company_id,
      serviceClient_id,
      serviceTypes,
    });
    await technician.save();

    if (fs.existsSync(rutaCarpetaUploads)) {
      // Borrar el archivo
      fs.unlink(rutaCarpetaUploads, (error) => {
        if (error) {
          console.error("Error al borrar el archivo:", error);
        } else {
          console.log("Archivo borrado exitosamente.");
        }
      });
    } else {
      console.log("El archivo no existe.");
    }
    return res.status(200).json({
      message:
        "El usuario ha sido registrado. ¡Ve al email con el que te registraste para validar el registro!",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { registerTechnician };
