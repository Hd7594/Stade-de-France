const mongoose = require("mongoose");

const User = mongoose.model("User-Stadium", {
  username: String,
  email: String,
  password: String,
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
