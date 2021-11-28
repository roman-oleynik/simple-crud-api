const { PORT } = require('./src/common/config');
const http = require("http");

const app = require('./src/app');

http.createServer(app).listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);