const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { HttpError } = require("./helpers");
const contactsRouter = require("./routes/api/contacts");
const isValidId = require("./middlewares/isValidId");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts/:id", isValidId);

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  next(HttpError(404, "Not found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
