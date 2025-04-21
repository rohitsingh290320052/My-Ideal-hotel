const express = require('express');
const router = express.Router();
const roomController = require('../controllers/rooms.controller');
const multer = require('multer'); // Import multer for file uploads
const {storage} = require('../CloudCofig'); // Import the storage configuration for Cloudinary
const upload = multer({ storage: storage }); // Set the storage configuration for multer

router.post('/create', upload.array('photos', 6),roomController.addrooms);

router.get('/:hotelName', roomController.getrooms); // Get rooms for a specific hotel

module.exports = router;