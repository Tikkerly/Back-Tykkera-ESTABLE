const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const file = files.img[0];
    const { name } = file;
    const shortName = name.split(".");
    const extension = shortName[shortName.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extension ${extension} no es permitida`);
    }
    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../../uploads/",
      carpeta,
      tempName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
