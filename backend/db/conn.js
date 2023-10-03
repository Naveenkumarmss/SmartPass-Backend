const dotenv = require("dotenv");
// const db = require("./db/conn.mjs");
const mongoose = require("mongoose");
dotenv.config();

const mongoString = process.env.DB_URI;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});


module.exports = database;
