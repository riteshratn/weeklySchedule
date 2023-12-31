const mongoose = require('mongoose');

const weekDataSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
  },
  text: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
});

const WeekData = mongoose.model('WeekData', weekDataSchema);

module.exports = WeekData;
