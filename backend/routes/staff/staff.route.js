const express = require('express');
const router = express.Router();
// const staffController = require('backend\controllers\satff.controller.js');
const staffController= require('../../controllers/staff.controller');

router.post('/register', staffController.registerStaff);
router.post('/login', staffController.loginStaff);

module.exports = router;
