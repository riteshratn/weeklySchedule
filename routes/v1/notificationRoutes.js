const express = require('express');
const { updateOrCreateNotification, getNotification } = require('../../controllers/notificationController');
const validateToken = require('../../middleware/validateTokenHandler');
const { validateNotification } = require('../../joiValidation/joinotification');

const router = express.Router();

router.put('/v1/notification', validateToken,validateNotification(), updateOrCreateNotification);

router.get('/v1/notification', validateToken, getNotification);

module.exports = router;