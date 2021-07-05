const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 6000;
const host = process.env.HOST || "localhost";

app.listen(
  {
    host: process.env.HOST,
    port,
  },
  () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://${host}:${port}`);
    /* eslint-enable no-console */
  }
);
