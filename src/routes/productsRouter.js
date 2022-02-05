const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product')
console.log(require('dotenv').config())

try{
    mongoose.connect(
        `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
        {useNewUrlParser: true}
    );
}
catch(e){
    console.log(e)
}

router.get('/products',(req,res)=>{
    try{
        Product.find().lean().exec(
            (err,prods)=>{
                if(err){
                    res.status(500).send(err);
                    }
                else{
                    res.status(200).send(prods);
                    }
            }
        )
    }
    catch(e){
        console.log(e);
    }

});

module.exports = router;