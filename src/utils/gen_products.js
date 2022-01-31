const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const ProductModel = require('../models/ProductModel');
require('dotenv').config({path: '../../.env'});


mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:${process.env.PORT}/${process.env.DBNAME}`,
    {useNewUrlParser: true});


async function add(n){
    try{
        for(let i=0;i<n;i++){
            const p = new ProductModel();
            p.name = faker.faker.commerce.productName();
            p.department = faker.faker.commerce.department();
            p.price = faker.faker.commerce.price();
    
            await p.save();
        }
    }
    catch(err){
        console.log(err);
    }
    
}

add(100)
.then(()=>{
    console.log('OK');
    mongoose.disconnect();
})