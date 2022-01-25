const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb://crudUser:crudUserPass@localhost:27017/angular8crud", {useNewUrlParser: true})

app.use('/departments', department_controller);
// app.use('/products', product_controller);

app.listen(3000,'localhost',()=>{
    console.log('conectado ao banco');
});