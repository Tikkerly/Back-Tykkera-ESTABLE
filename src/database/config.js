const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tikkerly:tikkerlypf123@tikkerly.pi8otnf.mongodb.net/"
    );
    console.log(process.env.MONGO_URI);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
