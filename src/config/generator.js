const mongoose = require('mongoose');
const Product = require('../models/Product');
const { faker }= require('@faker-js/faker');
require('dotenv').config({path: '.env'});

mongoose.connect(
        `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
        {useNewUrlParser: true}
    );

async function generateProducts(){
    for(let i = 0;  i<10; i++){
        let p = new Product({
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            price: faker.commerce.price()
        });
        try{
            await p.save();
        }
        catch(e){
            throw new Error("Error generating products")
        }
    }
}

console.log(process.env)

generateProducts()
.then(()=>{
    mongoose.disconnect();
    console.log("OK");
})

