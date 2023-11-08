const Joi = require('joi');

const joiexerciseSchema = Joi.array().items(
    Joi.object({
  name: Joi.string().required(),
  duration: Joi.string().required(),
  break: Joi.number().integer().required(),
})
)
.unique((a, b) => a.name === b.name);


const validateRequest = () => {
    return (req, res, next) => {
        const { error } = joiexerciseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { joiexerciseSchema };
module.exports = validateRequest;
