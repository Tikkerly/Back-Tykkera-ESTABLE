const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const server = express();

const allowedOrigins = ["http://localhost:3000"]; // Reemplaza con la URL de tu aplicación Next.js

const corsOptions = {
  origin: ["https://tu-aplicacion-next.vercel.app", "http://localhost:3000"], // Permitir solicitudes desde tu aplicación Next.js y desde localhost
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
