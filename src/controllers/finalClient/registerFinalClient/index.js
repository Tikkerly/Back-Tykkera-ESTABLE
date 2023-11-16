const path = require("path");
const fs = require("fs");
const {
  uploadFile,
} = require("../../../helpers");

const FinalClient = require("../../../models/FinalClient");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const registerFinalClient = async (req, res) => {
  try {
    const {
      username,
      email,
      document,
      documentType,
      img,
      phone,
      address,
      company_id,
      serviceClient_id,
    } = req.body;
 
    // const fileName = await uploadFile(req.files, undefined, "imgs");

    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
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
    const finalClient = new FinalClient({
      username,
      email,
      document,
      documentType,
      // img: secure_url,
      address,
      phone,
      company_id,
      serviceClient_id,
    });
    await finalClient.save();

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
    return res.status(400).json({ message: error.message });
  }
};

const validateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const finalClient = await FinalClient.findById(id);
    finalClient.activeRegister = true;
    finalClient.save();
    return res
      .status(200)
      .json({ msg: "Usuario Validado con exito", finalClient: finalClient });
  } catch (error) {
    return res.status(400).json({ msg: "Error al validar registro" });
  }
};

module.exports = { registerFinalClient, validateRegister };
