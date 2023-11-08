const express = require('express');
const { addExercises, deleteExercise, getExercises } = require('../../controllers/exerciseController');
const validateToken = require('../../middleware/validateTokenHandler');
const validateRequest = require('../../joiValidation/exerciseJoi');

const router = express.Router();

router.post('/v2/exercises', validateToken, validateRequest(), addExercises);

router.delete('/v2/exercises/:id', validateToken, deleteExercise);

router.get('/v2/exercises', validateToken, getExercises);

module.exports = router;
