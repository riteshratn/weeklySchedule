const express = require('express');
const router = express.Router();
const weekDataController = require('../controllers/weekDataController');
const validateToken = require('../middleware/validateTokenHandler');

// router.use(validateToken);

router.get('/week', validateToken, weekDataController.getWeekData);

router.put('/week/:id', weekDataController.updateWeekData);

module.exports = router;
