const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product')
require('dotenv').config();

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

router.get('/products_err', (req,res)=>{
    setTimeout(()=>{
         res.status(500).send({
             msg: "Error message from the server."
         })
     },2000);
});

router.get('/products_delay',(req,res)=>{
    try{
        setTimeout(
            () => {
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
            },2000
        )
    }
    catch(e){
        console.log(e);
    }

});

router.get('/product_ids',(req,res)=>{
    try{
        Product.find().lean().exec(
            (err,prods)=>{
                if(err){
                    res.status(500).send(err);
                    }
                else{
                    res.status(200).send(
                        prods.map((p)=>p._id)
                    );
                    }
            }
        )
    }
    catch(e){
        console.log(e);
    }

});

router.get('/products/name/:id',(req,res)=>{
    try{
        const id = req.params.id;
        Product.findById(id,
            (err,prod)=>{
                if(err){
                    res.status(500).send(err);
                    }
                if(!prod){
                    res.status(404).send({});
                }
                else{
                    res.status(200).send(prod.name);
                    }
            }
        )
    }
    catch(e){
        console.log(e);
    }

});

router.post('/products', (req,res)=>{
    try{
        p = new Product({
            name: req.body.name,
            price: req.body.price,
            department: req.body.price
        });
    
        p.save((err, prod) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(201).send(prod);
            }
        })
    }
    catch(e){
        console.log(e);
    }
    
});

router.delete('/products/:id', (req,res)=>{
    try{
        Product.deleteOne({_id: req.params.id},
            (err)=> {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).send({});
                }
            });
    }
    catch(e){
        res.status(500).send(e);
    }
    
});

router.patch('/products/:id',(req,res)=>{
    try{
        Product.findById(req.params.id, 
            (err,prod)=>{
                if(err){
                    res.status(500).send(err);
                }
                else if(!prod){
                    res.status(404).send({});
                }
                else{
                    prod.name = req.body.name;
                    prod.price = req.body.price;
                    prod.department = req.body.department;

                    prod.save((err,prod)=>{
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            res.status(200).send(prod);
                        }
                    })
                    
                }
            })
    }
    catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;