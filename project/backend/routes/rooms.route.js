const express = require('express');
const router = express.Router();
const roomController = require('../controllers/rooms.controller');

router.post('/create', roomController.addrooms);

router.get('/:hotelName', roomController.getrooms); // Get rooms for a specific hotel

module.exports = router;