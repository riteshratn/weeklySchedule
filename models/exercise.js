const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name:  {
    type: String,
    unique: true,
  },
  duration: {
    type: String,
  },
  break: {
    type: Number,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
