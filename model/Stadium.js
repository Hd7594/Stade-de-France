const mongoose = require("mongoose");

const Stadium = mongoose.model("Stadium", {
  stand: String,
  side: String,
  seats: {
    first: Number,
    second: Number,
    third: Number,
  },
});

module.exports = Stadium;
