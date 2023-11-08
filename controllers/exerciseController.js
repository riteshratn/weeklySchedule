const Exercise = require('../models/exercise');
const Joi = require('joi');

const responseSchema = Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().required(),
      break: Joi.number().integer().required(),
    }).unknown(true)
  );

exports.addExercises = async (req, res) => {
  const exerciseData = req.body;

 try {
    const addedExercises = await Exercise.create(exerciseData);
    const { error, value } = responseSchema.validate(addedExercises);
    if (error) {
        console.log(error);
      return res.status(500).json({ message: 'Failed to validate the response' });
    }

    res.status(201).json(value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add exercises or same exercise name exist.' });
  }
}

exports.deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(deletedExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete exercise' });
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    const { error, value } = responseSchema.validate(exercises);

    if (error) {
        console.log(error)
      return res.status(500).json({ message: 'Failed to validate the response' });
    }

    res.json(value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve exercises' });
  }
};
