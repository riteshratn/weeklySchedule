const express = require('express');
const { addExercises, deleteExercise, getExercises } = require('../../controllers/exerciseController');
const validateToken = require('../../middleware/validateTokenHandler');
const validateRequest = require('../../joiValidation/exerciseJoi');

const router = express.Router();

router.post('/v1/exercises', validateToken, validateRequest(), addExercises);

router.delete('/v1/exercises/:id', validateToken, deleteExercise);

router.get('/v1/exercises', validateToken, getExercises);

module.exports = router;
