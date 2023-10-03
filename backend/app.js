const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/user", require("./routes/userroutes/userroutes"));

module.exports = app;