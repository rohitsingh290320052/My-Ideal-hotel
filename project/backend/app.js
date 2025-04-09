const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/dbconfig');

// Import Routes
const guestRoutes = require('./routes/guests/guest.route');
const staffRoutes = require('./routes/staff/staff.route');
const hotelRoutes = require('./routes/hotels/hotel.route');

dotenv.config();
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/guest', guestRoutes);
app.use('/staff', staffRoutes);

app.use('/hotels', hotelRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
