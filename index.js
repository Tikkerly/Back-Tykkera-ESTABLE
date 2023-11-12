const { dbConnection } = require("./src/database/config");
const server = require("./src/server");

async function ConnectDB() {
  await dbConnection();
}

server.listen(process.env.PORT, () => {
  ConnectDB();
  console.log(`Server listening on port ${process.env.PORT}`);
});
