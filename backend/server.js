const connectDatabase = require("./db");



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

connectDatabase();

