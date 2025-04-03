const express =require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const db=require('./db/dbconfig');
const guestRoutes = require('./routes/guests/guest.route');
db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const port=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use('/guest',guestRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})