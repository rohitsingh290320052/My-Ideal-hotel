const Room = require('../models/rooms.model'); // Import the Room model

// Add a new room
exports.addrooms = async (req, res) => {
    try {
        const { photos, size, capacity, price, description, amenities, BedType, status, hotelName } = req.body;
        const room = new Room({ photos, size, capacity, price, description, amenities, BedType, status, hotelName });
        await room.save();
        res.status(200).json({ message: 'Room added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the room' });
    }
};

// Get rooms for a specific hotel
exports.getrooms = async (req, res) => {
    try {
        const hotelName = req.params.hotelName;
        const rooms = await Room.find({ hotelName }); // Fetch rooms for the specific hotel

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for this hotel' });
        }

        res.status(200).json({ rooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching rooms' });
    }
};