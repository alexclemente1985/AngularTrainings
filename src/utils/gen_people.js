const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const PersonModel = require('../models/PersonModel');
require('dotenv').config({path: '../../.env'});

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:${process.env.PORT}/${process.env.DBNAME}`,
    {useNewUrlParser: true});

async function add(n){
    try{
        for(let i=0;i<n;i++){
            const p = new PersonModel();
            p.name = faker.faker.name.firstName();
            p.country = faker.faker.address.country();
            p.email = faker.faker.internet.email();
            p.company = faker.faker.company.companyName();
    
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