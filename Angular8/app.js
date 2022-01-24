const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors);

mongoose.connect("mongodb+srv://alexandre:<password>@igti-fullstack-bootcamp.zn883.mongodb.net/http_app?retryWrites=true&w=majority", {useNewUrlParser: true})

app.use('/departments', department_controller);
// app.use('/products', product_controller);

app.listen(3000);