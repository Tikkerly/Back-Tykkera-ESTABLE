const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../../helpers");
const User = require("../../models/User");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drteukykt",
  api_key: "341428778955149",
  api_secret: "XnHkABuc9YoiNtTswQO4qddPB10",
});

const updateUploadFile = async (req, res) => {
  const { model, id } = req.params;

  let modelToChange;

  switch (model) {
    case "user":
      modelToChange = await User.findById(id);
      if (!modelToChange) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "No hay modelo valido" });
  }

  try {
    const name = await uploadFile(req.files, undefined, "imgs");

    // Limpiar imágenes previas
    if (modelToChange.img) {
      // Hay que borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        "imgs",
        modelToChange.img
      );
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }

    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "imgs",
      name
    );

    const { secure_url } = await cloudinary.uploader.upload(
      rutaCarpetaUploads,
      {
        folder: `imgs/${modelToChange.username}`,
      },
      (result, error) => {
        console.log(error);
      }
    );

    const updatedModel = await User.findByIdAndUpdate(
      id,
      { img: secure_url },
      { new: true } // Esto te devolverá el documento actualizado
    );

    res.json(updatedModel);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { updateUploadFile };
