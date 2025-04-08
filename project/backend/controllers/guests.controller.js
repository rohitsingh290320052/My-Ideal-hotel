const guestservice = require('../services/guests.services');

exports.registerGuest=async (req, res) => {
    const { name, email, phone, password } = req.body;
    const guest=await guestservice.registerGuest({ name, email, phone, password });
    if(guest.status){
        res.status(200).json({message:guest.message});
    }
    else{
        res.status(400).json({message:guest.message});
    }
}

exports.loginGuest=async (req, res) => {
    const { phone, password } = req.body;
    const guest = await guestservice.loginGuest({ phone, password });
    if(guest.status){
        res.status(200).json({message:guest.message});
    }
    else{
        res.status(400).json({message:guest.message});
    }
}
