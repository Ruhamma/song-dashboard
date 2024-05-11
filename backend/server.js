const express = require("express");
const connectDatabase = require("./db");
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

connectDatabase()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server connected to port 5000");
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
