require('dotenv').config();
const Lead = require('./models/Lead.js');
const express= require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const dbConnect = require('./config/database.js');

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

dbConnect();
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT}`);
});

