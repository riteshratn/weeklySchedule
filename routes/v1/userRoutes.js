const express = require('express');
const { registerUser,currentUser,loginUser } = require('../../controllers/authController');
const validateToken = require('../../middleware/validateTokenHandler');
const { validateUser } = require('../../joiValidation/userJoi');

const router = express.Router();

router.post('/v1/register', validateUser(), registerUser);

router.post('/v1/login', validateUser(), loginUser);

router.get('/v1/current',validateToken, currentUser);

module.exports = router;
