var express = require('express');
var router = express.Router();
var Department = require('./department');

router.post('/', function(req,res){
    console.log(req.body);
    let d = new Department({name: req.body.name});
    d.save((err,depto)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(depto);
        }
    })
});

router.get('/', function(req,res){
    Department.find().exec((err,depts)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(depts);
        }
    })
});

