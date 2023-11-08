const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    heading:  {
        type: String,
      },
      text: {
        type: String,
      },
      interval: {
        type: Number,
      },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
