const staffService = require('../services/staff.services');

exports.registerStaff = async (req, res) => {
    try {
        const { name, email, phone, password, role, department } = req.body;
        const staff = await staffService.registerStaff({ name, email, phone, password, role, department });

        if (!staff.status) return res.status(400).json({ message: staff.message });

        res.status(201).json({ message: staff.message, obj: staff.obj });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;
        const staff = await staffService.loginStaff({ email, password });

        if (!staff.status) return res.status(400).json({ message: staff.message });

        res.status(200).json({ message: staff.message, token: staff.token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
