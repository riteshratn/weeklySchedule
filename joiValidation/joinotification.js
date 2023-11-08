const Joi = require('joi');

const joinotificationSchema = Joi.object({
  heading: Joi.string().required(),
  text: Joi.string().required(),
  interval: Joi.number().integer().required(),
});

const validateNotification = () => {
    return (req, res, next) => {
        const { error } = joinotificationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { joinotificationSchema, validateNotification };
