require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieparser = require('cookie-parser')

const Employeeroutes = require('./routes/Employee.routes');
const VerifyUser = require('./routes/Auth.routes');

mongoose.connect('mongodb://127.0.0.1:27017/Fifty_Fourth_Batch');
const db = mongoose.connection



db.on("error",console.error.bind
    (console,"Connection error")
);

db.once("open",()=>{
    console.log("DB Connected Successfully")
})

const app = express();

app.use(cookieparser());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})

app.use('/api',Employeeroutes);
app.use('/api/auth',VerifyUser)

// console.log("JWT_SECRET ",process.env.JWT_SECRET);