const { dbConnection } = require("./src/database/config");
const server = require("./src/server");
const PORT = 3001;

async function ConnectDB() {
  await dbConnection();
}
server.listen(PORT, () => {
  ConnectDB();
  console.log(`Server listening on port ${PORT}`);
});
