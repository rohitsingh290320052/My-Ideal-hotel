const guestService = require('../services/guests.services');

exports.registerGuest = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const guest = await guestService.registerGuest({ name, email, phone, password });

    if (guest.status) {
        res.status(201).json({ message: guest.message, obj: guest.obj });
    } else {
        res.status(400).json({ message: guest.message });
    }
};

exports.loginGuest = async (req, res) => {
    const { phone, password } = req.body;
    const guest = await guestService.loginGuest({ phone, password });

    if (guest.status) {
        res.status(200).json({ message: guest.message, token: guest.token });
    } else {
        res.status(400).json({ message: guest.message });
    }
};
