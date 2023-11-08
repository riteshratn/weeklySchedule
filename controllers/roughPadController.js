const RoughPad = require('../models/RoughPad');
const Joi = require('joi');

const responseSchema = Joi.object({
    text: Joi.string().required(),
  });

exports.updateOrCreateText = async (req, res) => {
  try {
    const { text } = req.body;
    
    const roughPad = await RoughPad.findOne();
    
    if (roughPad) {
      roughPad.text = text;
      await roughPad.save();
    } else {
      await RoughPad.create({ text });
    }

    return res.status(200).json({ message: 'Text updated or created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating or creating text.' });
  }
};


exports.getRoughPadText = async (req, res) => {
  try {
    const roughPad = await RoughPad.findOne();

    if (roughPad) {
      const response = { text: roughPad.text };
      const { error } = responseSchema.validate(response);

      if (error) {
        return res.status(500).json({ message: 'Invalid response from the server' });
      }

      return res.json(response);
    } else {
      return res.json({ text: '' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving text.' });
  }
};
