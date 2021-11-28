const { PORT } = require('./src/common/config');
const http = require("http");

const app = require('./src/app');

const server = http.createServer(app);

server.listen(PORT, () =>
console.log(`App is running on http://localhost:${PORT}`)
);

server.on("error", err => {
  console.log("Error: " + err.message);
})