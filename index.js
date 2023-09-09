const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

const Route = require("./routes/stadium");
app.use(Route);

mongoose.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT, (req, res) => {
  console.log("server is on");
});
