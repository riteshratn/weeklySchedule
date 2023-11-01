const Exercise = require('../models/exerciseModel');

exports.addExercises = async (req, res) => {
  const exerciseData = req.body;

  try {
    const addedExercises = await Exercise.insertMany(exerciseData);
    res.status(201).json(addedExercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add exercises' });
  }
};

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
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve exercises' });
  }
};
