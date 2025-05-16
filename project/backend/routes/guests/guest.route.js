const express = require('express');
const router = express.Router();
const guestController = require('../../controllers/guests.controller');
const  islogin = require('../../middlewares/islogin');
router.post('/register', guestController.registerGuest);
router.post('/login', guestController.loginGuest);

module.exports = router;