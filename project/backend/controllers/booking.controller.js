const Room = require('../models/rooms.model');
const Booking = require('../models/booking.model');
const Guest = require('../models/guests/guests.model');
const axios = require('axios');

exports.bookingRoom = async (req, res, io) => {
    try {
        const { roomId, guestId, checkInDate, checkOutDate } = req.body;

        // Calculate the total amount
        const room = await Room.findById(roomId).select('price status');
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
       console.log(room.status)
        if (room.status === 'booked') {
            return res.status(400).json({ message: 'Room is not available for booking' });
        }

        const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
        const totalAmount = days * room.price;

        // Call payment gateway API
        const response = await axios.post('http://localhost:3000/pgateway', {
            amount: totalAmount,
        });
        console.log(response.data);
        console.log(response.status);
        if (response.status === 201) {
            // Update room status to 'booked'
            room.status = 'booked';
            await room.save();

            // Emit real-time event for room status update
            io.emit('roomStatusUpdated', { roomId: room._id, status: room.status });
            const updatedbookingstatus='confirmed';
            
            // Save booking details
            const booking = new Booking({ guestId, roomId, checkInDate, checkOutDate, totalAmount ,status:updatedbookingstatus});
            
            console.log(booking);
            await booking.save();

            // Get guest name for the response
            const guest = await Guest.findById(guestId).select('name');
            console.log(guest);
            res.status(200).json({
                message: `Booking successful for room ${roomId} by ${guest.name} `,
                bookingId: booking._id,
                roomId: room._id,
                guestId: guest._id,
                days: days,
                totalAmount: totalAmount,  
                
            });
        } else {
            res.status(500).json({ message: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during booking' });
    }
};

exports.getallBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('guestId').populate('roomId');
        console.log(bookings);
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching bookings' });
    }
}