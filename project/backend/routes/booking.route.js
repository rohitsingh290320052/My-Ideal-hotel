const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/create',(req,res)=>{
    bookingController.bookingRoom(req,res,req.io);
});
router.get('/all', bookingController.getallBookings); // Get all bookings

module.exports = router;