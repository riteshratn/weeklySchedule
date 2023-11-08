const Joi = require('joi');

const joiWeekdataSchema = Joi.array().items(
    Joi.object({
  name: Joi.string().required(),
  text: Joi.string().required()
})
).unique((a, b) => a.name === b.name);

const validateWeekdata = () => {
    return (req, res, next) => {
        const { error } = joiWeekdataSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { joiWeekdataSchema, validateWeekdata };