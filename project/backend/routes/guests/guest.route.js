const express = require('express');
const router = express.Router();
const guestController = require('../../controllers/guests.controller');

router.post('/register', guestController.registerGuest);
router.post('/login', guestController.loginGuest);

module.exports = router;