const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../../.env'});

module.exports = {
    register: async function(req,res){
        try{
            console.log('user req', req.body)
            let u = await UserModel.findOne({email: req.body.email});
            if(!u){
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }
            else{
                res.status(403).json({message: consts.error_msgs.EMAIL_ALREADY_REGISTERED, error:{}});
            }
        }
        catch(e){
            res.status(500).json({message: consts.error_msgs.ERROR_WHILE_SAVING_USER, error: e})
        }
    },
    login: function(req,res){
        const password = req.body.password;
        const email = req.body.email;
        let error = null;

        UserModel.findOne({email: email}).lean().exec(
            
            function(err,user){
                try{
                    if(err){
                        error = new Error(consts.error_msgs.BAD_GATEWAY/* consts.error_msgs.SERVER_ERROR */);
                        error.status = consts.http_status.server_errors.BAD_GATEWAY;

                        throw error;
                    }

                    const authErr = (password == '' || password ==null || !user);
    
                    if(!authErr){
                        if(bcrypt.compareSync(password, user.password)){
                            let token = jwt.sign({_id: user._id}, process.env.KEYJWT, {expiresIn: consts.expiresJWT});
                            delete user.password;
                            return res.json({...user, token: token})
                        }
                    } 
                    error = new Error(consts.error_msgs.WRONG_EMAIL_PASSWORD);
                    error.status = consts.http_status.client_errors.NOT_FOUND;
                    throw error;             
                }
                catch(e){
                    switch(e.status){
                        case consts.http_status.client_errors.NOT_FOUND:
                            return res
                            .status(consts.http_status.client_errors.NOT_FOUND)
                            .json({message: consts.error_msgs.WRONG_EMAIL_PASSWORD});
                        case consts.http_status.server_errors.BAD_GATEWAY:
                            return res
                            .status(consts.http_status.server_errors.BAD_GATEWAY)
                            .json({message: consts.error_msgs.BAD_GATEWAY, error: err});
                        default:
                            return res
                            .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                            .json({message: consts.error_msgs.SERVER_ERROR, error: e});
                    }
                }
                
            }
        )
    }
}