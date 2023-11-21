const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const server = express();

// Permitir solicitudes desde un dominio específico de Next.js
const allowedOrigins = ["https://tu-aplicacion-next.vercel.app"]; // Reemplaza con la URL de tu aplicación Next.js

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11, varios) requieren este código de estado para CORS
};

server.use(cors(corsOptions));

server.use(express.json());
//server.use(cors());
server.use(morgan("dev"));
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

server.use("/api/v1", router);

module.exports = server;
