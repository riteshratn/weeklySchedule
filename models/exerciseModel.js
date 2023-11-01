const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name:  {
    type: String,
  },
  duration: {
    type: String,
  },
  break: {
    type: Number,
  },
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
