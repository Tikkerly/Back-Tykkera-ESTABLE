const validateUploads = (req, res = response, next) => {
  const files = req.files.files;
  if (!files || Object.keys(files).length === 0 || !files.name) {
    return res.status(400).json({
      msg: "No hay archivos que subir - validarArchivoSubir",
    });
  }

  next();
};

module.exports = {
  validateUploads,
};
