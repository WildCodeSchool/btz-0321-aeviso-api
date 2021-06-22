const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(
  {
    host: process.env.HOST,
    port,
  },
  () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  }
);
