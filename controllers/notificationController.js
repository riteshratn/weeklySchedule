const Notification = require('../models/notification');
const Joi = require('joi');
const notificationResponseSchema = Joi.object({
    heading: Joi.string().required(),
    text: Joi.string().required(),
    interval: Joi.number().required()
  }).unknown(true);
exports.updateOrCreateNotification = async (req, res) => {
  try {
    const { heading, text, interval } = req.body;
    const notification = await Notification.findOne();

    if (notification) {
      notification.heading = heading;
      notification.text = text;
      notification.interval = interval;
      await notification.save();
    } else {
      await Notification.create({ heading, text, interval });
    }
    const validationResult = notificationResponseSchema.validate(notification);

    if (validationResult.error) {
        console.error(validationResult.error);
      return res.status(500).json({ message: 'Invalid response from the server' });
    }

    return res.status(200).json(validationResult.value);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating or creating notification.' });
  }
};

exports.getNotification = async (req, res) => {
    try {
        const notification = await Notification.findOne();
    
        if (notification) {
          const validationResult = notificationResponseSchema.validate(notification);
          if (validationResult.error) {
            return res.status(500).json({ message: 'Invalid response from the server' });
          }
          return res.json(validationResult.value);
        } else {
          return res.json({});
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving notification.' });
      }
};
