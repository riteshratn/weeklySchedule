const express = require('express');
const router = express.Router();
const weekDataController = require('../../controllers/weekDataController');
const validateToken = require('../../middleware/validateTokenHandler');
const { validateWeekdata } = require('../../joiValidation/weekDataJoi');

// router.use(validateToken);

router.get('/v1/week', validateToken, weekDataController.getWeekData);

router.put('/v1/week',validateToken, validateWeekdata(), weekDataController.updateWeekData);

module.exports = router;
