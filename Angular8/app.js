const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controller');
const product_controller = require('./product_controller');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(`mongodb://${process.env.USERDB}:${process.env.PWDDB}@localhost:${process.env.PORT}/angular8crud`, {useNewUrlParser: true})

app.use('/departments', department_controller);
app.use('/products', product_controller);

app.listen(3000,'localhost',()=>{
    console.log('conectado ao banco');
});