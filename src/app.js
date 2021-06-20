const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const errors = require("./middlewares/errors");
const api = require("./api");

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app;
