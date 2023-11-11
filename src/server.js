const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/v1", router);

module.exports = server;
