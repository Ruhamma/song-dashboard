const express = require("express");
const connectDatabase = require("./db");
const app = require("./app");
const cloudinary = require("cloudinary");


app.use(express.json());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});





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
