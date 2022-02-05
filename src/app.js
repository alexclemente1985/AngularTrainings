const express = require('express');
const cors = require('cors');
const router = require('./routes/productsRouter.js');
require('dotenv').config({path: '.env'});

const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const myLogger = function(req,res,next){
    console.log(req.body);
    next();
}

app.use(myLogger);
app.use(router);

app.listen(process.env.PORT);

