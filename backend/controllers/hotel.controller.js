const Hotel = require('../models/hotel.model');

exports.searchHotels = async (req, res) => {
  try {
    const { name, city, state } = req.query;
    let query = {};

    if (name) query.name = new RegExp(name, 'i'); // case-insensitive
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');

    const hotels = await Hotel.find(query);
    res.status(200).json({ status: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};
