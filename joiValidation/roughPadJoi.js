const Joi = require('joi');

const joiroughpadSchema = Joi.object({
    text: Joi.string().required()
  });

  const validateRoughpad = () => {
    return (req, res, next) => {
        const { error } = joiroughpadSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { joiroughpadSchema, validateRoughpad };