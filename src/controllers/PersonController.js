const PersonModel = require('../models/PersonModel');

module.export = {
    all: function(req,res){
        PersonModel.find({}).lean().exec(
            (err,people)=> {
                if(err){
                    return res.json([]);
                }
                return res.json(people);
            }
        )
    }
}