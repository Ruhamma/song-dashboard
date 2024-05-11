const express = require("express");
const cors = require("cors");
const app = express();

const songsRouter = require("./routes/song");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

app.use(express.json());
app.use("/api/songs", songsRouter);

module.exports = app;
