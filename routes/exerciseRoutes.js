const express = require('express');
const { addExercises, deleteExercise, getExercises } = require('../controllers/exerciseController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/exercises', validateToken, addExercises);

router.delete('/exercises/:id', validateToken, deleteExercise);

router.get('/exercises', getExercises);

module.exports = router;
