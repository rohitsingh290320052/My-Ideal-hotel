const express =require('express');
const app = express();
const {createServer} = require('http');
const initsocket=require('./controllers/socket');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const db=require('./db/dbconfig');
const guestRoutes = require('./routes/guests/guest.route');
const roomRoutes = require('./routes/rooms.route');
const bookingRoutes = require('./routes/booking.route');
db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const server = createServer(app);
const io=initsocket(server);


// Attach `io` to `req` using middleware
app.use((req, res, next) => {
    req.io = io; // Attach the Socket.IO instance to the request object
    next();
});


const port=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use('/guest',guestRoutes);
app.use('/room',roomRoutes);
app.use('/booking',bookingRoutes);

app.post('/pgateway',(req,res)=>{
    const {amount}=req.body;
    console.log(amount);
    res.status(200).json({message:'Payment successful'});
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})