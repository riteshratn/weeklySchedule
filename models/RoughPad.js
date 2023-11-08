const mongoose = require("mongoose");

const roughPadSchema = new mongoose.Schema(
  {
    text: String,
  }
);

const RoughPad = mongoose.model("RoughPad", roughPadSchema);

module.exports = RoughPad;
