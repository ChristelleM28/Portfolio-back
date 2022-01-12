const express = require("express");
const mainRouter = require("./routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ foo: "hello" });
});

app.use("/api/", mainRouter);

module.exports = app;