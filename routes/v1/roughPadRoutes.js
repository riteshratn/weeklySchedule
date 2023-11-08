const express = require('express');
const { updateOrCreateText, getRoughPadText } = require('../../controllers/roughPadController');
const validateToken = require('../../middleware/validateTokenHandler');
const { validateRoughpad } = require('../../joiValidation/roughPadJoi');

const router = express.Router();

router.put('/v1/rough-pad', validateToken, validateRoughpad(), updateOrCreateText);

router.get('/v1/rough-pad', validateToken, getRoughPadText);

module.exports = router;
